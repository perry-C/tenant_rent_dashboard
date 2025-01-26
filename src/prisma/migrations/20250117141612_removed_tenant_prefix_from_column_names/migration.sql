/*
  Warnings:

  - You are about to drop the column `tenant_tel` on the `Tenant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "tenant_tel",
ADD COLUMN     "tel" VARCHAR(50);
