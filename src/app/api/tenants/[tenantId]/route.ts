import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
    _: NextRequest,
    {
        params,
    }: {
        params: Promise<{ tenantId: string }>;
    }
) {
    // const req = request.json();
    const tenantId = (await params).tenantId;

    const tenantFound = await prisma.tenant.findUnique({
        where: { id: Number(tenantId) },
    });
    if (!tenantFound) {
        return { status: 404, body: { message: 'Tenant not found' } };
    }
    return NextResponse.json(tenantFound, { status: 200 });
}

export async function DELETE(
    _: NextRequest,
    {
        params,
    }: {
        params: Promise<{ tenantId: string }>;
    }
) {
    const tenantId = (await params).tenantId;

    const deletedTenant = await prisma.tenant.delete({
        where: { id: Number(tenantId) },
    });
    if (!deletedTenant) {
        return { status: 404, body: { message: 'Tenant not found' } };
    }
    return NextResponse.json(deletedTenant, { status: 200 });
}
