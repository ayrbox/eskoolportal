import type { Student, ClassGroup, Section } from "@prisma/client";

export type StudentWithClassGroup = Student & {
  ClassGroup: ClassGroup;
  Section: Section;
};
