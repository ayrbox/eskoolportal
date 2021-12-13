const { v4: uuidv4 } = require('uuid');
import { PrismaClient } from '@prisma/client';

import seedClassGroups from './classes';
import seedSections from './sections';
import seedUsers from './users';
import seedStudents from './students';
import clear from './clear';

const prisma = new PrismaClient();

export const seeder = async () => {
    // Clear all tables
    console.log('Clearing all tables...');
    await clear(prisma);

    console.log('Seeding classes...');
    await seedClassGroups(prisma);
    console.log('Classes complete.');

    console.log('Seeding sections...');
    await seedSections(prisma);
    console.log('Sections complete.');

    console.log('Seeding students...');
    await seedStudents(prisma);
    console.log('Students complete.');

    console.log('Seeding users...');
    await seedUsers(prisma);
    console.log('Users complete.');
};

seeder()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
    });
