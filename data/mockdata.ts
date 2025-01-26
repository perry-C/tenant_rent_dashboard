import { faker } from '@faker-js/faker';
import { PaymentType, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function generateFakeData(amount = 10) {
    let fake_tenants = [];
    for (let i = 0; i < amount; i++) {
        fake_tenants.push(createFakeTenant());
    }
    return await Promise.all(fake_tenants);
}

async function createFakeTenant() {
    let move_in_date = faker.date.recent();
    return await prisma.tenant.create({
        data: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            nationality: faker.location.country(),
            tel: faker.phone.number(),
            contract: {
                create: {
                    contract_validity: true,
                    deposit_amount: faker.number.float({
                        min: 1000,
                        max: 2000,
                    }),
                    // deposit_paid: true,
                    flat_number: faker.location.buildingNumber(),
                    room_number: faker.string.fromCharacters(['a', 'b'], 1),
                    move_in_date: move_in_date,
                    move_out_date: faker.date.recent({
                        refDate: move_in_date,
                    }),
                    tenancy_length: faker.number.int({ min: 6, max: 24 }),
                    monthly_rent: faker.number.float({
                        min: 400,
                        max: 800,
                    }),
                    // monthly_internet_charge: 50.0,
                    // monthly_garbage_charge: 20.0,
                    eac_bill_deposit: 100.0,
                    water_bill_deposit: 50.0,
                },
            },
            payments: {
                create: [
                    {
                        payment_date: faker.date.recent(),
                        payment_amount: faker.number.float({
                            min: 400,
                            max: 800,
                        }),
                        payment_type: PaymentType.RENT,
                        rent_month: faker.date.recent(),
                    },
                    {
                        payment_date: faker.date.recent(),
                        payment_amount: faker.number.float({
                            min: 400,
                            max: 800,
                        }),
                        payment_type: PaymentType.RENT,
                        rent_month: faker.date.recent(),
                    },
                ],
            },
        },
    });
}

generateFakeData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
