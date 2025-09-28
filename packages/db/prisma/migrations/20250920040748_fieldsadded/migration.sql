/*
  Warnings:

  - Added the required column `checkInterval` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "checkInterval" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
