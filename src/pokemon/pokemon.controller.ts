import { Controller, Get, Param, Post,Body,Put, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CapturepokemonDto } from './dto/pokemon.dto'

@Controller('pokemon')
export class PokemonController {
    constructor(
        private pokeService: PokemonService
    ) { }

    @Get(':nameOrId')
    findPokemon(@Param('nameOrId') nameOrId: string) {
        if (!isNaN(Number(nameOrId))) {
            return this.pokeService.apiGetPokemonById(Number(nameOrId));
        }
        return this.pokeService.apiGetPokemonByName(nameOrId);
    }

    @Post()
    capturePokemon(@Body() newPoke: CapturepokemonDto){
        return this.pokeService.capturePokemon(newPoke)
    }

    @Get('/user/:id')
    async getPokemonByUser(@Param('id') idUser: string) {
        return this.pokeService.getPokemonByUser(idUser);
    }

    @Put('/user/:id')
    async updatePokemonByUser(@Param('id') idPoke: string, @Body() updatePoke: CapturepokemonDto) {
        return this.pokeService.updatePokemon(idPoke,updatePoke);
    }

    @Delete('/user/:id')
    async deletePokemonByUser(@Param('id') idPoke: string) {
        return this.pokeService.deletePokemon(idPoke);
    }
}
