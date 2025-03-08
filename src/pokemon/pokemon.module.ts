import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule }from '@nestjs/cache-manager'
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon, PokemonSchema } from '../schemas/pokemon/pokemon.schema'
import * as memoryStore from 'cache-manager-memory-store';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    CacheModule.register({
      store: memoryStore,
      ttl: 600, //Tiempo en segundos (10 minutos)
      max: 100, // Máximo de elementos en caché
      isGlobal: true
    })
  ],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule {}
