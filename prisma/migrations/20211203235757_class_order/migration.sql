/*
  Warnings:

  - Added the required column `order` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "order" INTEGER NOT NULL;
