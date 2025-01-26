import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from '@/lib/variables';
import chromium from '@sparticuz/chromium';
import { NextRequest, NextResponse } from 'next/server';

export async function generatePdfService(request: NextRequest) {
    const body = await request.json();

    let browser;
    try {
        const ReactDomServer = (await import('react-dom/server')).default;
        const InvoiceTemplate = (
            await import('@/components/Invoice/invoiceTemplate')
        ).default;
        const htmlTemplate = ReactDomServer.renderToStaticMarkup(
            InvoiceTemplate(body)
        );
        if (ENV === 'production') {
            const puppeteer = await import('puppeteer-core');
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(
                    CHROMIUM_EXECUTABLE_PATH
                ),
                headless: true,
            });
        } else if (ENV === 'development') {
            const puppeteer = await import('puppeteer');
            browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                headless: true,
            });
        }
        if (!browser) {
            throw new Error('Failed to launch browser');
        }
        const page = await browser.newPage();
        console.log('Page opened');
        await page.setContent(htmlTemplate, {
            waitUntil: ['load', 'networkidle0'],
        });
        console.log('Page Content Set');
        await page.addStyleTag({
            url: TAILWIND_CDN,
        });
        console.log('Tailwind CSS Added');
        const pdf: Buffer = await page.pdf({
            format: 'a4',
            printBackground: true,
        });
        console.log('PDF Generated');
        for (const page of await browser.pages()) {
            await page.close();
        }
        await browser.close();
        console.log('Browser Closed');
        const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
        const response = new NextResponse(pdfBlob, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename=invoice.pdf',
            },
            status: 200,
        });
        return response;
    } catch (error) {
        console.log(error);
        return new NextResponse('Error generating PDF', { status: 500 });
    }
}
