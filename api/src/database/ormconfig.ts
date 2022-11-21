import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});
