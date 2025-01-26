/*
  Warnings:

  - You are about to drop the column `tenant_name` on the `Tenant` table. All the data in the column will be lost.
  - Added the required column `tenant_first_name` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_last_name` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "tenant_name",
ADD COLUMN     "tenant_first_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "tenant_last_name" VARCHAR(255) NOT NULL;
