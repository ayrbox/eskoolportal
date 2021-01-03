import path from 'path';
import { createConnection } from 'typeorm';

import { Student } from '../entities/Student';
import { Class } from '../entities/Class';
import { Section } from '../entities/Section';
import { User } from '../entities/User';
import entities from '../entities';

import seedClass from './classes';
import seedSection from './sections';
import seedUsers from './users';
import seedStudents from './students';

// TODO: split seeder into runner and method
export const seederIndex = async () => {
  await createConnection({
    type: 'postgres',
    url: 'postgresql://eskuser:eskpassword@localhost:5466/test_eskoolportal', // TODO read from some config
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities,
    synchronize: true,
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

// CREATE RUNNER to be invoked by package script
// seederIndex()
//   .then(() => process.exit(0))
//   .catch((err) => {
//     console.error(err);
//   });
