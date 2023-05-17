import type {
  Student,
  ClassGroup,
  Section,
  ObtainedMarks,
} from "@prisma/client";

export type StudentWithClassGroup = Student & {
  ClassGroup: ClassGroup;
  Section: Section;
};

// FIX: Duplicate definition
export type StudentWithObtainedMarks = Student & {
  ClassGroup: ClassGroup;
  Section: Section;
  obtainedMarks: ObtainedMarks[];
  fullMark: number; // full mark is copied from previous entry
  passMark: number; // pass mark is copied from previous entry
};
