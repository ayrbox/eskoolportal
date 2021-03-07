import { Connection, ConnectionOptions, getConnectionManager } from 'typeorm';
import databaseEnttities from './entities';
import { updateConnectionEntities } from './updateConnectionEntities';
import migrations from './migrations';

const isProduction = process.env.NODE_ENV === 'production';

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

const options: Record<string, ConnectionOptions> = {
  default: {
    type: 'postgres',
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT),
    entities: databaseEnttities,
    migrations,
    logging: !isProduction,
    migrationsRun: true,
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
