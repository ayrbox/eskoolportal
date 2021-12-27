import { Exam, PrismaClient } from "@prisma/client";
import { Factory } from "rosie";
import { date, name, random } from "faker";

export const examNames = [
  "Unit Test",
  "First Trimester Exam",
  "Second Trimester Exam",
  "Final Exam",
];

const examFactory = new Factory<Exam>().attrs({
  name: () => name.findName(),
  description: () => random.words(10),
  startDate: () => date.future(),
  endDate: () => date.future(),
  fiscalYearId: "",
});

export default async function seedExam(prisma: PrismaClient) {
  await prisma.examName.createMany({
    data: examNames.map((name) => ({ name })),
  });

  const fiscalYears = await prisma.fiscalYear.findMany();
  const exams = fiscalYears
    .map(({ id: fiscalYearId }) =>
      examNames.map((name) => examFactory.build({ name, fiscalYearId }))
    )
    .flat();

  await prisma.exam.createMany({
    data: exams,
  });
}
