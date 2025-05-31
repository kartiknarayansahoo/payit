-- CreateEnum
CREATE TYPE "TransTypeStatus" AS ENUM ('Deposit', 'Withdraw', 'Transfer');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "transType" "TransTypeStatus";
