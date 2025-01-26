import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const allTenants = await prisma.tenant.findMany();
    return NextResponse.json(allTenants);
}

export async function POST(request: NextRequest) {
    const req = await request.json();
    let newTenant;
    if (req.hasContract) {
        newTenant = await prisma.tenant.create({
            data: {
                first_name: req.first_name,
                last_name: req.last_name,
                tel: req.tel,
                nationality: req.nationality,
                contract: {
                    create: {
                        flat_number: req.flat_number,
                        room_number: req.room_number,
                        monthly_rent: req.monthly_rent,
                        tenancy_length: Number(req.tenancy_length),
                        move_in_date: new Date(req.move_in_date).toISOString(),
                        move_out_date: new Date(
                            req.move_out_date
                        ).toISOString(),
                        deposit_amount: req.deposit_amount,
                        eac_bill_deposit: req.eac_bill_deposit,
                        water_bill_deposit: req.water_bill_deposit,
                    },
                },
            },
        });
    } else {
        newTenant = await prisma.tenant.create({
            data: {
                first_name: req.first_name,
                last_name: req.last_name,
                tel: req.tel,
                nationality: req.nationality,
            },
        });
    }

    return NextResponse.json(newTenant, { status: 201 });
}

