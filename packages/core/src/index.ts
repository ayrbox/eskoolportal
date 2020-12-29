import path from 'path';
import { createConnection, Connection } from 'typeorm';
import { Class } from './entities/Class';
import { Student } from './entities/Student';
import entities from './entities';

export interface DatabaseCredential {
  databaseUrl: string;
  logging: boolean;
}

let conn: Connection;

// databaseUrl: 'postgresql://eskuser:eskpassword@localhost:5466/eskoolportal
const main = async ({ databaseUrl, logging = false }: DatabaseCredential) => {
  conn = await createConnection({
    type: 'postgres',
    url: databaseUrl,
    logging,
    migrations: [path.join(__dirname, './migrations/*')],
    entities,
  });
  // TODO: await conn.runMigrations();
};

export default main;
