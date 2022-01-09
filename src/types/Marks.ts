import { Exam, ObtainMarks, Student, Subject } from "@prisma/client";

export type ObtainMarksWithStudentDetail = ObtainMarks & {
  student: Student;
  subject: Subject;
  exam: Exam;
};

export type Marks = {
  fullMark: number;
  passMark: number;
  obtainedMarks: number;
};

export type ObtainedMarksQueryParams = {
  examId: string;
  classGroupId: string;
  sectionId: string;
  subjectId: string;
  examType: string | null;
};

export type StudentMarksPayload = ObtainedMarksQueryParams & {
  marks: Marks;
};
