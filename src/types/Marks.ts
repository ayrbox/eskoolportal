import { Exam, ObtainMarks, Student, Subject } from "@prisma/client";

export type ObtainMarksWithStudentDetail = ObtainMarks & {
  student: Student;
  subject: Subject;
  exam: Exam;
};
