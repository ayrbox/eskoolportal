import path from 'path';
import { createConnection } from 'typeorm';

import entities, { Class, Section, Student, User } from '../entities';

import seedClass from './classes';
import seedSection from './sections';
import seedUsers from './users';
import seedStudents from './students';

const seederIndex = async () => {
  await createConnection({
    type: 'postgres',
    url: 'postgresql://eskuser:eskpassword@localhost:5466/eskoolportal',
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities,
  });

  await Student.delete({});
  await User.delete({});
  await Section.delete({});
  await Class.delete({});

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
