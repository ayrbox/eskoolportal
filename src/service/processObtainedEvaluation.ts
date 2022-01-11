import { StudentWithObtainedMarks } from "~/types/Marks";

export const processObtainedEvaluation = (
  studentsWithObtainedMarks: StudentWithObtainedMarks[]
) => {
  let subjects: Record<
    string,
    {
      id: string;
      name: string;
      fullMarks: number | 0;
      passMarks: number | 0;
      obtainedMarks: number | 0;
    }
  > = {};

  for (const student of studentsWithObtainedMarks) {
    for (const obtainedMark of student.obtainedMarks) {
      subjects[obtainedMark.subjectId] = {
        id: obtainedMark.subjectId,
        name: obtainedMark.subject.name,
        fullMarks: 0,
        passMarks: 0,
        obtainedMarks: 0,
      };
    }
  }

  return studentsWithObtainedMarks.map((student) => {
    const obtainedMarks = { ...subjects };
    for (const studentMarks of student.obtainedMarks) {
      obtainedMarks[studentMarks.subjectId] = {
        id: studentMarks.subjectId,
        name: studentMarks.subject.name,
        fullMarks: studentMarks.fullMark,
        passMarks: studentMarks.passMark,
        obtainedMarks: studentMarks.obtainedMarks,
      };
    }
    const { id, name, referenceCode } = student;
    return { id, name, referenceCode, obtainedMarks };
  });
};
