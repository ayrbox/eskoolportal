import { Exam, ObtainedMarks, Student, Subject } from "@prisma/client";

export type ObtainedMarksWithStudentDetail = ObtainedMarks & {
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

export type ExamClassQueryParams = {
  examId: string;
  classGroupId: string;
  sectionId: string;
};

export type StudentWithObtainedMarks = Student & {
  obtainedMarks: (ObtainedMarks & {
    subject: { name: string };
    classGroup: { name: string };
    section: { name: string };
  })[];
};
