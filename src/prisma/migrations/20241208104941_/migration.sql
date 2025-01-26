/*
  Warnings:

  - You are about to drop the column `monthly_garbage_charge` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_internet_charge` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "monthly_garbage_charge",
DROP COLUMN "monthly_internet_charge";
