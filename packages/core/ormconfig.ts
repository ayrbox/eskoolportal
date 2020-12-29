// {
//   "type": "postgres",
//   "host": "localhost",
//   "port": 5466,
//   "username": "eskuser",
//   "password": "eskpassword",
//   "database": "eskoolportal",
//   "entities": ["src/entities/*.ts"],
//   "migrations": ["src/migrations/*.js"]
// }

import { ConnectionOptions } from 'typeorm';
import path from 'path';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5466,
  username: process.env.POSTGRES_USER || 'eskuser',
  password: process.env.POSTGRES_PASSWORD || 'eskpassword',
  database: process.env.POSTGRES_DB || 'eskoolportal',
  entities: [path.join(__dirname, './src/entities/*.ts')],
  migrations: [path.join(__dirname, './src/migrations/*.ts')],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
};

export = config;
