import { NextRequest } from 'next/server';

// Services
import { generatePdfService } from '@/services/invoice/generatePdfService';

export async function POST(req: NextRequest) {
    const result = await generatePdfService(req);
    return result;
}
