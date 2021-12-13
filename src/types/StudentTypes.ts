import type { Student, ClassGroup, Section } from '@prisma/client';

export type StudentWithClassGroup = Student & {
    Class: ClassGroup;
    Section: Section;
};
