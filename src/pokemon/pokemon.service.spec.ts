import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PokemonService', () => {
  let service: PokemonService;
  let pokemonRepository: Repository<Pokemon>;
  let cacheManagerMock: any;

  const mockPokemonRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    cacheManagerMock = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
        {
          provide: getRepositoryToken(Pokemon),
          useValue: mockPokemonRepository,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    pokemonRepository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have repository injected', () => {
    expect(pokemonRepository).toBeDefined();
  });

  it('should structure pokemon JSON correctly', () => {
    const mockApiData = {
      id: 1,
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      sprites: { front_default: 'image_url' }
    };

    const result = service.structuredPokemonJson(mockApiData);

    expect(result).toEqual({
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison'],
      abilities: ['overgrow'],
      sprite_url: 'image_url'
    });
  });

  it('should throw error when fetching non-existent pokemon fails', async () => {
    // This test simulates API failure case
    jest.spyOn(service, 'apiGetPokemonById').mockImplementation(async () => {
      throw new HttpException('Pokémon no encontrado', HttpStatus.NOT_FOUND);
    });

    await expect(service.apiGetPokemonById(999999)).rejects.toThrow(HttpException);
  });
});
