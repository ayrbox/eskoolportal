import { createConnection } from "typeorm";

import { Student } from "../entities/Student";
import { Class } from "../entities/Class";
import { Section } from "../entities/Section";
import { User } from "../entities/User";

import seedClass from "./classes";
import seedSection from "./sections";
import seedUsers from "./users";
import seedStudents from "./students";

export const seederIndex = async () => {
  await createConnection();
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
  .then(() => {
    console.log("Seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
  });
