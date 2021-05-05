import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // Initializing dotenv

const ssl = process.env.DB_SSL === 'true';

const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl,
  extra: ssl ? { ssl: { rejectUnauthorized: false } } : {},
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
  logging: ['error', 'migration', 'schema'],
};
module.exports = typeormConfig;
