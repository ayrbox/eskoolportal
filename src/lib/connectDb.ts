import config from 'config';
import { Connection, createConnection, getConnection } from 'typeorm';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';

import coreEntities from 'database/entities';

const databaseUrl = config.get<string>('db.url');
const logging = config.get<boolean>('db.logging');

let connection: Connection;
export const connectDb = async () => {
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
  } catch (ex) {
    console.error(ex);
  }
};

export default connectDb;
