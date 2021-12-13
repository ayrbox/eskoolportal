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
    await clear(prisma);

    await seedClassGroups(prisma);
    await seedSections(prisma);
    await seedStudents(prisma);
    await seedUsers(prisma);
};

seeder()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
    });
