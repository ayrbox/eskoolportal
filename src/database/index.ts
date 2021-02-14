import 'reflect-metadata';
import config from 'config';
import { Connection, createConnection, getConnection } from 'typeorm';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';

import coreEntities from '~/database/entities';
import { updateConnectionEntities } from './updateConnectionEntities';

const databaseUrl = config.get<string>('db.url');
const logging = config.get<boolean>('db.logging');

let connection: Connection;
export const ensureConnection = async () => {
  async function _connect() {
    connection = getConnection();
    if (!connection.isConnected) {
      connection = await connection.connect();
    }
  }

  try {
    if (!connection) {
      try {
        connection = await createConnection({
          type: 'postgres',
          url: databaseUrl,
          logging,
          entities: coreEntities,
          migrationsRun: true,
        });
      } catch (error) {
        if (error instanceof AlreadyHasActiveConnectionError) {
          await _connect();
        } else {
          console.error('ADAPTER_CONNECTION_ERROR', error);
        }
      }
    } else {
      await _connect();
    }

    if (process.env.NODE_ENV !== 'production') {
      await updateConnectionEntities(connection, coreEntities);
    }
  } catch (ex) {
    console.error(ex);
  }
};
