import { PrismaClient } from "@prisma/client";

export default async function clear(prisma: PrismaClient): Promise<void> {
  await prisma.obtainedMarks.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
  await prisma.section.deleteMany();
  await prisma.classGroup.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.examName.deleteMany();
  await prisma.fiscalYear.deleteMany();
}
