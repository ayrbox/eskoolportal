import { ObtainedMarks, Student, Subject } from "@prisma/client";
import { Table } from "reactstrap";
import { StudentWithObtainedMarks } from "~/types/Marks";

const extractSubjects = (
  studentsWithObtainedMarks: StudentWithObtainedMarks[]
): Subject[] => {
  const subjects: Subject[] = [];

  for (const student of studentsWithObtainedMarks) {
    for (const obtainedMark of student.obtainedMarks) {
      const subjectFound = subjects.find(
        ({ id }) => id === obtainedMark.subjectId
      );
      if (!subjectFound) {
        subjects.push({
          id: obtainedMark.subjectId,
          name: obtainedMark.subject.name,
          description: "-", // NOTE: this should be optional
        });
      }
    }
  }
  return subjects;
};

/**
 * Renders table cells for marks obtained.
 * @param subjects Subject[] Array of subjects that has been entered for students in selected group
 * @param obtainedMarks ObtainedMarks[] Array of obtained marks for a particular student in the loop
 * @returns  ReactElements[]
 */
const renderSubjectMarks = (
  subjects: Subject[],
  obtainedMarks: ObtainedMarks[]
) =>
  subjects.map((subject) => {
    const marks = obtainedMarks.find((m) => m.subjectId === subject.id);
    return (
      <td key={subject.id} className="text-right">
        {marks ? marks.obtainedMarks : 0}
      </td>
    );
  });

/**
 * Returns sum of obtained marks by a student
 * @param obtainedMarks
 * @returns
 */
const totalMarks = (obtainedMarks: ObtainedMarks[]) =>
  obtainedMarks.reduce((total, marks) => total + marks.obtainedMarks, 0);

export interface MarksEvaluationTableProps {
  studentsWithObtainedMarks: StudentWithObtainedMarks[];
}

export default function MarksEvaluationTable({
  studentsWithObtainedMarks,
}: MarksEvaluationTableProps) {
  const subjects = extractSubjects(studentsWithObtainedMarks);

  return (
    <Table bordered striped>
      <thead>
        <tr>
          <th>Student Code</th>
          <th>Student</th>
          {subjects.map((subject) => (
            <th key={subject.id}>{subject.name}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {studentsWithObtainedMarks.map((student) => (
          <tr key={student.id}>
            <td>{student.referenceCode}</td>
            <td>{student.name}</td>
            {renderSubjectMarks(subjects, student.obtainedMarks)}

            <td className="text-right">
              <strong>{totalMarks(student.obtainedMarks)}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
