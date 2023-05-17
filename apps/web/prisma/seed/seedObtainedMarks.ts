import { Exam, ObtainedMarks, PrismaClient } from "@prisma/client";
import { Factory } from "rosie";
import { date, name, random, datatype } from "faker";

export const examNames = [
  "Unit Test",
  "First Trimester Exam",
  "Second Trimester Exam",
  "Final Exam",
];

const obtainedMarksFactory = new Factory<ObtainedMarks>().attrs({
  examId: "-",
  studentId: "-",
  subjectId: "-",
  classGroupId: "-",
  sectionId: "-",
  examType: null,
  fullMark: 100,
  passMark: 40,
  obtainedMarks: () => datatype.number({ min: 0, max: 100 }),
});

export default async function seedObtainedMarks(prisma: PrismaClient) {
  const classGroup = await prisma.classGroup.findFirst({
    where: { name: "10" },
  });

  const exam = await prisma.exam.findFirst({
    orderBy: {
      fiscalYear: {
        endDate: "desc",
      },
    },
  });

  const students = await prisma.student.findMany({
    where: {
      classGroupId: classGroup?.id,
    },
  });

  const subjects = await prisma.subject.findMany();

  for (const subject of subjects) {
    for (const student of students) {
      const data = obtainedMarksFactory.build({
        examId: exam?.id,
        studentId: student.id,
        subjectId: subject.id,
        classGroupId: student.classGroupId || undefined,
        sectionId: student.sectionId || undefined,
      });
      await prisma.obtainedMarks.create({ data });
    }
  }
}
