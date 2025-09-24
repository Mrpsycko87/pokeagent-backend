# PokeAgent Backend Migration Guide

This guide details the migration from MongoDB to PostgreSQL 16 and modernization updates.

## Overview of Changes

### Database Migration: MongoDB → PostgreSQL 16
- **From**: MongoDB with Mongoose ODM
- **To**: PostgreSQL 16 with TypeORM

### Framework Updates
- **Node.js**: Updated to LTS version 20
- **NestJS**: Already at version 11.x (latest)
- **Dependencies**: All updated to latest compatible versions
- **Security**: All npm vulnerabilities fixed

## Migration Steps

### 1. Prerequisites

Install the following:
- [Node.js 20 LTS](https://nodejs.org/)
- [PostgreSQL 16](https://www.postgresql.org/)
- [Docker & Docker Compose](https://docs.docker.com/) (optional, for containerized deployment)

### 2. Environment Setup

Create `.env` file from the template:
```bash
cp .env.example .env
```

Update the database configuration in `.env`:
```env
# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=pokeagent

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 3. Database Setup

#### Option A: Using Docker Compose (Recommended)
```bash
# Start PostgreSQL container
docker-compose up -d postgres

# The database will be initialized automatically
```

#### Option B: Local PostgreSQL Installation
```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE pokeagent;
CREATE USER pokeagent_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE pokeagent TO pokeagent_user;
```

### 4. Data Migration (If you have existing MongoDB data)

Create a migration script to transfer data:
```typescript
// scripts/migrate-data.ts (example)
import { MongoClient } from 'mongodb';
import { createConnection } from 'typeorm';
import { User, Pokemon } from '../src/entities';

export async function migrateData() {
  // Connect to MongoDB
  const mongoClient = new MongoClient('your-mongodb-uri');
  await mongoClient.connect();
  
  // Connect to PostgreSQL
  const pgConnection = await createConnection({...typeOrmConfig});
  
  // Migrate Users
  const users = await mongoClient.db().collection('users').find().toArray();
  for (const user of users) {
    const newUser = pgConnection.getRepository(User).create({
      name: user.name,
      password: user.password,
    });
    await pgConnection.getRepository(User).save(newUser);
  }
  
  // Migrate Pokemon...
}
```

### 5. Run the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start in development mode
npm run start:dev

# Or start in production mode
npm run start:prod
```

### 6. Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## Key Changes Made

### Database Layer
- Replaced Mongoose schemas with TypeORM entities
- Updated all database operations from Mongoose to TypeORM
- Added proper relationships (User ↔ Pokemon)
- Enhanced type safety with TypeScript

### Entity Changes
```typescript
// Before: Mongoose Schema
@Schema({ timestamps: true })
export class Pokemon extends Document {
  @Prop({ required: true })
  name: string;
  // ...
}

// After: TypeORM Entity
@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @CreateDateColumn()
  createdAt: Date;
  // ...
}
```

### Service Layer Updates
```typescript
// Before: Mongoose Model injection
constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>)

// After: TypeORM Repository injection
constructor(@InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>)
```

### Configuration Updates
- Added TypeORM configuration
- Updated Docker Compose for PostgreSQL 16
- Environment variable structure updated
- Added database initialization scripts

## Deployment

### Docker Deployment
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
```

### Manual Deployment
1. Ensure PostgreSQL 16 is running
2. Set environment variables
3. Run migrations: `npm run build && node dist/main.js`

## Breaking Changes

### API Endpoints
All API endpoints remain the same - no breaking changes for frontend applications.

### Database IDs
- **Before**: MongoDB ObjectIDs (24-character hex strings)
- **After**: PostgreSQL UUIDs (RFC 4122 format)

If you have existing integrations that depend on the ID format, you may need to update them.

## Rollback Plan

If you need to rollback:
1. Stop the application
2. Restore from MongoDB backup
3. Switch back to the previous version using git
4. Restart with MongoDB configuration

## Performance Improvements

- **Query Performance**: PostgreSQL typically offers better query performance for structured data
- **ACID Compliance**: Full ACID compliance for data integrity
- **Indexing**: Better indexing capabilities
- **Concurrent Access**: Improved handling of concurrent operations

## Support

If you encounter issues during migration:
1. Check the application logs
2. Verify database connection
3. Ensure all environment variables are set correctly
4. Review the TypeORM documentation for advanced configurations