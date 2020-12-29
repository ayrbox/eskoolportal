import path from 'path';
import { createConnection } from 'typeorm';

import entities, { Class } from './entities';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: 'postgresql://eskuser:eskpassword@localhost:5466/eskoolportal',
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities,
  });
  // await conn.runMigrations();
  // await Post.delete({});

  const a = await Class.findOne('100');
  console.log('>>>>>>>>>>>>', a);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
  });
