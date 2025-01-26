/*
  Warnings:

  - Made the column `deposit_amount` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deposit_paid` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `move_in_date` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `move_out_date` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenancy_length` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monthly_rent` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eac_bill_deposit` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Made the column `water_bill_deposit` on table `Contract` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "deposit_amount" SET NOT NULL,
ALTER COLUMN "deposit_paid" SET NOT NULL,
ALTER COLUMN "move_in_date" SET NOT NULL,
ALTER COLUMN "move_out_date" SET NOT NULL,
ALTER COLUMN "tenancy_length" SET NOT NULL,
ALTER COLUMN "monthly_rent" SET NOT NULL,
ALTER COLUMN "eac_bill_deposit" SET NOT NULL,
ALTER COLUMN "water_bill_deposit" SET NOT NULL;
