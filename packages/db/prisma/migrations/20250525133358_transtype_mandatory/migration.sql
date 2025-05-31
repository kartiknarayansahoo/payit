/*
  Warnings:

  - Made the column `transType` on table `OnRampTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "transType" SET NOT NULL;
