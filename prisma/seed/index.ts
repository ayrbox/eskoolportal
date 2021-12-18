import { PrismaClient } from "@prisma/client";

import seedClassGroups from "./classes";
import seedSections from "./sections";
import seedUsers from "./users";
import seedStudents from "./students";
import seedSubjects from "./subjects";
import clear from "./clear";
import seedFiscalYear from "./fiscalYear";

const prisma = new PrismaClient();

export const seeder = async () => {
  // Clear all tables
  console.log("Clearing all tables...");
  await clear(prisma);

  console.log("[START] Seeding classes...");
  await seedClassGroups(prisma);
  console.log("[END] Classes complete.");

  console.log("[START] Seeding sections...");
  await seedSections(prisma);
  console.log("[END] Sections complete.");

  console.log("[START] Seeding students...");
  await seedStudents(prisma);
  console.log("[END] Students complete.");

  console.log("[START] Seeding users...");
  await seedUsers(prisma);
  console.log("[END] Users complete.");

  console.log("[START] Seeding subjects...");
  await seedSubjects(prisma);
  console.log("[END] Subjects complete.");

  console.log("[START] Seeding fiscal years...");
  await seedFiscalYear(prisma);
  console.log("[END] Fiscal Year seeded.");
};

seeder()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
  });
