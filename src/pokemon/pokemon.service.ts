import { Injectable, HttpException, HttpStatus, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from '../schemas/pokemon/pokemon.schema'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import axios from 'axios';


@Injectable()
export class PokemonService {
    public readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>
    ) { }

    structuredPokemonJson(data: any) {
        const formattedPokemon = {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            sprite_url: data.sprites.front_default
        };
        return formattedPokemon
    };

    async apiGetPokemonByName(name: string) {
        const cacheKey = `pokemon-${name}`;
        console.log('cacheKey---', cacheKey);
        try {
            const cachedPokemon = await this.cacheManager.get(cacheKey);
            console.log('unoo---', cachedPokemon);

            if (cachedPokemon) {
                console.log(`Pokémon ${name} obtenido desde caché`);
                return cachedPokemon;
            }
            const response = await axios.get(`${this.apiUrl}/${name.toLowerCase()}`);
            const data = response.data;
            const formatedData = this.structuredPokemonJson(data);
            await this.cacheManager.set(cacheKey, formatedData);
            const cachedPokemon2 = await this.cacheManager.get(cacheKey);
            console.log('dos---', cachedPokemon2);
            console.log(`Pokémon ${name} obtenido desde la PokeAPI y formateado`);
            return formatedData;
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            throw new HttpException('Pokémon no encontrado', HttpStatus.NOT_FOUND);
        }
    }

    async apiGetPokemonById(id: number) {
        const cacheKey = `pokemon-${id}`;
        console.log('cacheKey---', cacheKey);
        try {
            const cachedPokemon = await this.cacheManager.get(cacheKey);
            console.log('unoo---', cachedPokemon);

            if (cachedPokemon) {
                console.log(` Pokémon ${id} obtenido desde caché`);
                return cachedPokemon;
            }
            const response = await axios.get(`${this.apiUrl}/${id}`);
            const data = response.data;
            const formatedData = this.structuredPokemonJson(data);
            await this.cacheManager.set(cacheKey, formatedData);
            const cachedPokemon2 = await this.cacheManager.get(cacheKey);
            console.log('dos---', cachedPokemon2);
            console.log(`Pokémon ${id} obtenido desde la PokeAPI y formateado`);
            return formatedData;
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            throw new HttpException('Pokémon no encontrado', HttpStatus.NOT_FOUND);
        }
    }

    async capturePokemon(newPoke: any): Promise<Pokemon> {
        const namePokemon = await this.pokemonModel.findOne({ name: newPoke.name, user:newPoke.user });
        if (namePokemon) {
            throw new HttpException('El usuario ya tiene ese  pokemon', HttpStatus.BAD_REQUEST);
        } else {
            const newpokemon = new this.pokemonModel({
                name: newPoke.name,
                nickname: newPoke.nickname,
                ide: newPoke.id,
                user: newPoke.user,
                sprite_url: newPoke.sprite_url,
                abilities: newPoke.abilities,
                types: newPoke.types
            })
            return newpokemon.save()
        }
    }
    async getPokemonByUser(idUser:string){
        const pokemons = await this.pokemonModel.find({ user: idUser }).sort({ createdAt: -1 });
        return pokemons
        
    }

    async updatePokemon(idPoke:string, updatePoke:any) {
        const pokemon = await this.pokemonModel.findByIdAndUpdate(idPoke, updatePoke, { new: true });
        if (!pokemon) {
            throw new NotFoundException(`Pokémon con ID ${idPoke} no encontrado.`);
        }
        return pokemon;
    }

    async deletePokemon(idPoke:string) {
        const pokemon = await this.pokemonModel.findByIdAndDelete(idPoke);
        if (!pokemon) {
            throw new NotFoundException(`Pokémon con ID ${idPoke} no encontrado.`);
        }
        return pokemon;
    }
}
