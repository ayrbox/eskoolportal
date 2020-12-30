import path from 'path';
import { createConnection, Connection } from 'typeorm';
import { EntityCollection } from './entities';
import { Class } from './entities/Class';
import { Section } from './entities/Section';
import { Student } from './entities/Student';
import { User } from './entities/User';

export interface DatabaseCredential {
  databaseUrl: string;
  logging?: boolean;
}

let defaultConnection: Connection | undefined;

export const getEntities = async (
  dbCredential?: DatabaseCredential
): Promise<EntityCollection> => {
  console.log('cred', dbCredential);
  console.log(defaultConnection);

  if (!defaultConnection && dbCredential) {
    console.log('Connecting...');

    const entitiesArray = [Class, Section, Student, User];

    const { databaseUrl, logging = false } = dbCredential;
    defaultConnection = await createConnection({
      type: 'postgres',
      url: databaseUrl,
      logging,
      migrations: [path.join(__dirname, './migrations/*')],
      entities: entitiesArray,
    });
    console.log('db connection successful');
  }

  return {
    Class,
    Section,
    Student,
    User,
  };
};

export default getEntities;
