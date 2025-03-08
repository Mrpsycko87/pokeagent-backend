import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as memoryStore from 'cache-manager-memory-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'your_default_mongodb_uri'),
    PokemonModule,CacheModule.register({
    store: memoryStore,
    ttl: 600, //Tiempo en segundos (10 minutos)
    max: 100, // Máximo de elementos en caché
    isGlobal: true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

