/*
  Warnings:

  - A unique constraint covering the columns `[referenceCode]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_referenceCode_key" ON "Student"("referenceCode");
