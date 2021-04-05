import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // Initializing dotenv

function getDBConnectionURL() {
  const prefix = process.env.DB_PREFIX;
  const host = process.env.DB_HOST;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  return `${prefix}://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
}

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: getDBConnectionURL(),
  port: Number.parseInt(process.env.DB_PORT as string, 10),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  entities: [],
  autoLoadEntities: true,
  logging: ['error', 'migration', 'schema'],
};
