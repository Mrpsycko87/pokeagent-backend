import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import axios from 'axios';

describe('PokemonService', () => {
  let service: PokemonService;
  let pokemonModelMock: Model<any>;
  let cacheManagerMock: any;

  beforeEach(async () => {
    cacheManagerMock = {
      get: jest.fn(),
      set: jest.fn(),
    };

    pokemonModelMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
        { provide: getModelToken('Pokemon'), useValue: pokemonModelMock },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('debe obtener Pokémon desde la caché si está disponible', async () => {
    const mockPokemon = { id: 1, name: 'Pikachu', types: ['electric'], abilities: ['static'], sprite_url: 'url' };

    jest.spyOn(cacheManagerMock, 'get').mockResolvedValue(mockPokemon);

    const result = await service.apiGetPokemonById(1);

    expect(result).toEqual(mockPokemon);
    expect(cacheManagerMock.get).toHaveBeenCalledWith('pokemon-1');
  });

  it('debe obtener Pokémon desde la API si no está en caché', async () => {
    jest.spyOn(cacheManagerMock, 'get').mockResolvedValue(null); // Simular caché vacía

    const mockPokemonFromApi = {
      id: 1,
      name: 'Pikachu',
      types: ['electric'],
      abilities: ['static'],
      sprite_url: 'url'
    };

    // Simular respuesta de la API externa (axios.get)
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockPokemonFromApi });

    // Simular transformación de datos
    jest.spyOn(service, 'structuredPokemonJson').mockReturnValue(mockPokemonFromApi);

    // Ejecutamos la función real (NO la mockeamos completamente)
    const result = await service.apiGetPokemonById(1);

    // Verificamos que axios haya sido llamado para obtener los datos
    expect(axios.get).toHaveBeenCalledWith(`${service.apiUrl}/1`);

    // Verificamos que structuredPokemonJson haya sido llamado
    expect(service.structuredPokemonJson).toHaveBeenCalledWith(mockPokemonFromApi);

    // Verificamos que los datos obtenidos de la API se guardaron en la caché
    expect(cacheManagerMock.set).toHaveBeenCalledTimes(1);
    expect(cacheManagerMock.set).toHaveBeenCalledWith('pokemon-1', mockPokemonFromApi);

    expect(result).toEqual(mockPokemonFromApi);
  });
  it('debe lanzar un error 404 si la API falla', async () => {
    cacheManagerMock.get.mockResolvedValue(null);
    (axios.get as jest.Mock).mockRejectedValue(new Error('Request failed'));

    await expect(service.apiGetPokemonById(9999)).rejects.toThrow(
      new HttpException('Pokémon no encontrado', HttpStatus.NOT_FOUND),
    );
  });

});
