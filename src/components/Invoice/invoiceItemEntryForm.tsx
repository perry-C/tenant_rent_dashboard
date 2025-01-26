import Button from '@/components/ui/button';
import { PaymentType } from '@prisma/client';
import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import InvoiceItem from './invoiceItem';

import { formatPriceToString } from '@/lib/helpers';
const InvoiceItemEntryForm = () => {
    const { control, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        name: 'details.invoice_items',
        control: control,
    });

    const handleItemAdd = () => {
        append({
            payment_type: PaymentType.RENT,
            payment_amount: 0,
            due_date: new Date(),
        });
    };

    const setTotalAmount = () => {
        let total = 0;
        for (const item of watchInvoiceItems) {
            total += Number(item.payment_amount);
        }
        setValue('details.total_amount', total);
        setValue('details.total_amount_in_words', formatPriceToString(total));
    };

    const watchInvoiceItems = useWatch({
        control,
        name: 'details.invoice_items',
    });
    useEffect(() => {
        setTotalAmount();
    }, [watchInvoiceItems]);

    return (
        <div className='space-y-2 flex flex-col'>
            <span className='font-bold text-xl'>Payment Details</span>
            <ul>
                {fields?.map((val, index) => (
                    <li key={val.id}>
                        <InvoiceItem index={index} removeItem={remove} />
                    </li>
                ))}
            </ul>

            <Button dashed={true} onClick={handleItemAdd}>
                Add Another Transaction ?
            </Button>
        </div>
    );
};

export default InvoiceItemEntryForm;
