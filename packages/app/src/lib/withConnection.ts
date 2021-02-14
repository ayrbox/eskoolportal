import config from 'config';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createConnection, getConnection } from 'typeorm';
import { ConnectionNotFoundError } from 'typeorm/error/ConnectionNotFoundError';

import entities from '@eskoolportal/core/lib/entities';

const databaseUrl = config.get<string>('db.url');
const logging = config.get<boolean>('db.logging');

const withConnection = (fn: NextApiHandler | Function) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await getConnection(); // get default connection
  } catch (err) {
    if (err instanceof ConnectionNotFoundError) {
      console.log('Connecting...');
      await createConnection({
        type: 'postgres',
        url: databaseUrl,
        logging,
        entities,
      });
    }
  }

  return fn(req, res);
};

export default withConnection;
