import path from 'path';
import { createConnection } from 'typeorm';

import entities from '../entities';

import seedClass from './classes';
import seedSection from './sections';
import seedUsers from './users';
import seedStudents from './students';

const seederIndex = async () => {
  const entitiesArray = Object.keys(entities).map((_) => _);

  await createConnection({
    type: 'postgres',
    url: 'postgresql://eskuser:eskpassword@localhost:5466/eskoolportal', // TODO read from some config
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: entitiesArray,
  });

  await entities.Student.delete({});
  await entities.User.delete({});
  await entities.Section.delete({});
  await entities.Class.delete({});

  await seedClass();
  await seedSection();
  await seedStudents();
  await seedUsers();
};

seederIndex()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
  });
