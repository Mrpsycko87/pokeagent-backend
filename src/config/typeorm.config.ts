import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, Pokemon } from '../entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'pokeagent',
  entities: [User, Pokemon],
  synchronize: process.env.NODE_ENV !== 'production', // Only for development
  logging: process.env.NODE_ENV === 'development',
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
};