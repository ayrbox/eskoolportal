import path from 'path';
import { createConnection } from 'typeorm';

import { Student } from '../entities/Student';
import { Class } from '../entities/Class';
import { Section } from '../entities/Section';
import { User } from '../entities/User';
import entities from '../entities';
import migrations from '../migrations';

import seedClass from './classes';
import seedSection from './sections';
import seedUsers from './users';
import seedStudents from './students';

// TODO: split seeder into runner and method
export const seederIndex = async () => {
  await createConnection({
    type: 'postgres',
    url: 'postgresql://eskuser:eskpassword@localhost:5466/eskoolportal',
    logging: true,
    migrations,
    entities,
    migrationsRun: true,
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
