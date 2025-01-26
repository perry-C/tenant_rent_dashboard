import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    try {
        const tenantId = searchParams.get('tenantId');
        if (tenantId) {
            const tenantFound = await prisma.contract.findUnique({
                where: { tenant_id: Number(tenantId) },
            });
            return NextResponse.json(tenantFound);
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                );
            }
        }
        throw e;
    }
}
