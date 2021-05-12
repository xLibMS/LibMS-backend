import * as typeormConfig from './ormconfig';

const database = {
  ...typeormConfig,
  entities: ['src/**/*.orm-entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/**/migrations/*.ts'],
  seeds: ['src/modules/**/seeding/**/*.seeder.ts'],
  factories: ['src/modules/**/seeding/**/*.factory.ts'],
  cli: {
    migrationsDir: `src/infrastructure/database/migrations`,
  },
};

export = database;
