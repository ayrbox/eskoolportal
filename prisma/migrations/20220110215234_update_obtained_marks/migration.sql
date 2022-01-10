/*
  Warnings:

  - You are about to drop the `ObtainMarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ObtainMarks" DROP CONSTRAINT "ObtainMarks_classGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ObtainMarks" DROP CONSTRAINT "ObtainMarks_examId_fkey";

-- DropForeignKey
ALTER TABLE "ObtainMarks" DROP CONSTRAINT "ObtainMarks_studentId_fkey";

-- DropForeignKey
ALTER TABLE "ObtainMarks" DROP CONSTRAINT "ObtainMarks_subjectId_fkey";

-- DropTable
DROP TABLE "ObtainMarks";

-- CreateTable
CREATE TABLE "ObtainedMarks" (
    "id" TEXT NOT NULL,
    "examType" TEXT,
    "fullMark" INTEGER NOT NULL DEFAULT 0,
    "passMark" INTEGER NOT NULL DEFAULT 0,
    "obtainedMarks" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "classGroupId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "ObtainedMarks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ObtainedMarks" ADD CONSTRAINT "ObtainedMarks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObtainedMarks" ADD CONSTRAINT "ObtainedMarks_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObtainedMarks" ADD CONSTRAINT "ObtainedMarks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObtainedMarks" ADD CONSTRAINT "ObtainedMarks_classGroupId_fkey" FOREIGN KEY ("classGroupId") REFERENCES "ClassGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObtainedMarks" ADD CONSTRAINT "ObtainedMarks_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
