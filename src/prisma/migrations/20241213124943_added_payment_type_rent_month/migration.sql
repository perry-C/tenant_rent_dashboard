/*
  Warnings:

  - Added the required column `payment_type` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('RENT', 'DEPOSIT', 'EAC', 'WATER');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "rent_month" DATE,
DROP COLUMN "payment_type",
ADD COLUMN     "payment_type" "PaymentType" NOT NULL;
