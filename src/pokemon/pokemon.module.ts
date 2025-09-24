import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../entities/pokemon.entity';
import * as memoryStore from 'cache-manager-memory-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    CacheModule.register({
      store: memoryStore,
      ttl: 600, // Time in seconds (10 minutes)
      max: 100, // Maximum elements in cache
      isGlobal: true,
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
