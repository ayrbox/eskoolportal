import { Connection, ConnectionOptions, getConnectionManager } from 'typeorm';
import config from 'config';
import databaseEnttities from './entities';
import { updateConnectionEntities } from './updateConnectionEntities';
import migrations from './migrations';

const isProduction = process.env.NODE_ENV === 'production';

const databaseUrl = config.get<string>('db.url');
const logging = config.get<boolean>('db.logging');
const ssl = config.get<boolean>('db.ssl');

const options: Record<string, ConnectionOptions> = {
  default: {
    type: 'postgres',
    url: databaseUrl,
    entities: databaseEnttities,
    migrations,
    logging,
    migrationsRun: true,
    ssl,
  },
};

export async function ensureConnection(name = 'default'): Promise<Connection> {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(name)) {
    const connection = connectionManager.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }

    if (!isProduction) {
      await updateConnectionEntities(connection, options[name].entities);
    }

    return connection;
  }

  return connectionManager.create({ name, ...options[name] }).connect();
}
