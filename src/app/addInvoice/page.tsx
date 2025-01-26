'use client';

import InvoiceEntryForm from '@/components/Invoice/invoiceEntryForm';
import LivePreview from '@/components/Invoice/livePreview';
import { GENERATE_PDF_API } from '@/lib/variables';
import { InvoiceType } from '@/types';
import { Tenant } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
export default function AddInvoicePage() {
    const [invoicePdf, setInvoicePdf] = useState<Blob>(new Blob());
    const [tenants, setTenants] = useState<Tenant[]>([]);

    const methods = useForm<InvoiceType>({
        defaultValues: {
            sender: {
                first_name: '',
                last_name: '',
            },
            receiver: {
                first_name: '',
                last_name: '',
                room_number: '',
            },
            details: {
                create_date: new Date().toISOString(),
                due_date: new Date().toISOString(),
                contract_id: '',
                tenant_id: '',
                invoice_items: [],
                total_amount: 0,
            },
        },
    });
    const { watch } = methods;
    const formData = watch();

    useEffect(() => {
        const ac = new AbortController();
        axios
            .get('/api/tenants')
            .then((res) => {
                setTenants(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        return () => {
            ac.abort();
        };
    }, []);

    const handleDownloadPdf = async () => {
        axios
            .post(GENERATE_PDF_API, formData, { responseType: 'blob' })
            .then((res) => {
                setInvoicePdf(res.data);
                createDownloadLink(res.data);
            })
            .catch((err) => {
                console.log('err:' + err);
            });

        // Initialise a downloadable link for pdf download, revoke the object url after download
        const createDownloadLink = async (invoicePdf: Blob) => {
            const url = window.URL.createObjectURL(invoicePdf);
            const a = document.createElement('a');
            a.href = url;
            //TODO: set the filename to be more specific
            a.download = 'invoice.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        };
    };

    return (
        <div className='p-10 grid grid-cols-2 h-full overflow-auto justify-around space-x-4'>
            <FormProvider {...methods}>
                <div className='col-span-1'>
                    <InvoiceEntryForm formData={formData} tenants={tenants} />
                </div>
                <div className='col-span-1'>
                    <button
                        className='btn btn-primary mb-2'
                        onClick={handleDownloadPdf}
                    >
                        Download PDF
                    </button>
                    <LivePreview data={formData} />
                </div>
            </FormProvider>
        </div>
    );
}
