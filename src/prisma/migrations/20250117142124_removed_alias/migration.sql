/*
  Warnings:

  - The primary key for the `Tenant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tenant_first_name` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_last_name` on the `Tenant` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_tenant_id_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_pkey",
DROP COLUMN "tenant_first_name",
DROP COLUMN "tenant_id",
DROP COLUMN "tenant_last_name",
ADD COLUMN     "first_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "last_name" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
