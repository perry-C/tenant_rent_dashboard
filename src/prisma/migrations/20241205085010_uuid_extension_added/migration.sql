-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "Tenant" (
    "tenant_id" SERIAL NOT NULL,
    "tenant_name" VARCHAR(255) NOT NULL,
    "nationality" VARCHAR(100),
    "tenant_tel" VARCHAR(50),
    "contract_id" UUID NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("tenant_id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "contract_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "tenant_id" INTEGER NOT NULL,
    "contract_validity" BOOLEAN NOT NULL,
    "deposit_amount" DECIMAL(10,2),
    "deposit_paid" BOOLEAN,
    "flat_number" VARCHAR(50),
    "room_number" VARCHAR(50),
    "move_in_date" DATE,
    "move_out_date" DATE,
    "tenancy_length" INTEGER,
    "monthly_rent" DECIMAL(10,2),
    "monthly_internet_charge" DECIMAL(10,2),
    "monthly_garbage_charge" DECIMAL(10,2),
    "eac_bill_deposit" DECIMAL(10,2),
    "water_bill_deposit" DECIMAL(10,2),

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("contract_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "payment_date" DATE NOT NULL,
    "payment_amount" DECIMAL(10,2) NOT NULL,
    "payment_type" VARCHAR(100),
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contract_tenant_id_key" ON "Contract"("tenant_id");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
