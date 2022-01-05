import type { Student, ClassGroup, Section, ObtainMarks } from "@prisma/client";

export type StudentWithClassGroup = Student & {
  ClassGroup: ClassGroup;
  Section: Section;
};

export type StudentWithObtainedMarks = Student & {
  ClassGroup: ClassGroup;
  Section: Section;
  obtainMarks: ObtainMarks[];
  fullMark: number; // full mark is copied from previous entry
  passMark: number; // pass mark is copied from previous entry
};
