// Components

import {
    FULL_DATE as FULL_DATE_FORMAT,
    YEAR_MONTH as MONTH_FORMAT,
} from '@/lib/variables';
import { InvoiceType } from '@/types';
import React from 'react';
import InvoiceLayout from './invoiceLayout';

const InvoiceTemplate = (data: InvoiceType) => {
    const { sender, receiver, details } = data;

    return (
        <InvoiceLayout>
            <div className='flex justify-between'>
                <div className='flex flex-col'></div>

                <div className='text-right'>
                    <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                        Invoice # 2025-121
                    </h2>
                    <span className='mt-1 block text-gray-500'>
                        {/* {details.invoiceNumber} */}
                    </span>
                    <address className='mt-4 not-italic text-gray-800'>
                        17051 Lincoln Ave
                        <br />
                        Parker
                        <br />
                        Colorado, 80134 <br />
                        United States
                    </address>
                </div>
            </div>
            <div>
                <h1 className='mt-2 text-lg md:text-xl font-semibold text-red-800'>
                    Bill from: {sender.first_name} {sender.last_name}
                </h1>
            </div>

            <div className='mt-6 grid sm:grid-cols-2 gap-3'>
                <div>
                    <h3 className='text-lg font-semibold text-gray-800'>
                        Bill to:
                    </h3>
                    <h3 className='text-lg font-semibold text-gray-800'>
                        {receiver.first_name} {receiver.last_name}
                    </h3>
                    <address className='mt-2 not-italic text-gray-500'>
                        Room {receiver.flat_number} {receiver.room_number}
                        <br />
                        {/* {receiver.city}, {receiver.country} */}
                        {/* {receiver.tenant_id} */}
                    </address>
                </div>

                <div className='sm:text-right space-y-2'>
                    <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
                        <dl className='grid sm:grid-cols-6 gap-x-3'>
                            <dt className='col-span-3 font-semibold text-gray-800'>
                                Invoice date:
                            </dt>
                            <dd className='col-span-3 text-gray-500'>
                                {new Date(
                                    details.create_date
                                ).toLocaleDateString('en-US', FULL_DATE_FORMAT)}
                            </dd>
                        </dl>
                        <dl className='grid sm:grid-cols-6 gap-x-3'>
                            <dt className='col-span-3 font-semibold text-gray-800'>
                                Due date:
                            </dt>
                            <dd className='col-span-3 text-gray-500'>
                                {new Date(details.due_date).toLocaleDateString(
                                    'en-US',
                                    FULL_DATE_FORMAT
                                )}
                            </dd>
                        </dl>
                    </div>
                </div>

                <div className='mt-3 col-span-2'>
                    <div className='border border-gray-200 p-1 rounded-lg space-y-1'>
                        <div className='hidden sm:grid sm:grid-cols-5'>
                            <div className='sm:col-span-2 text-xs font-medium text-gray-500 uppercase'>
                                Item
                            </div>
                            <div className='text-left text-xs font-medium text-gray-500 uppercase'>
                                Qty
                            </div>
                            <div className='text-left text-xs font-medium text-gray-500 uppercase'>
                                For Which Month
                            </div>
                            <div className='text-right text-xs font-medium text-gray-500 uppercase'>
                                Amount
                            </div>
                        </div>
                        <div className='hidden sm:block border-b border-gray-200'></div>
                        <div className='grid grid-cols-3 sm:grid-cols-5 gap-y-1'>
                            {details.invoice_items &&
                                details.invoice_items.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className='col-span-full sm:col-span-2 border-b border-gray-300'>
                                            <p className='font-medium text-gray-800'>
                                                {item.payment_type}
                                            </p>
                                            {/* <p className='text-xs text-gray-600 whitespace-pre-line'>
                                                {item.description}
                                            </p> */}
                                        </div>
                                        <div className='border-b border-gray-300'>
                                            <p className='text-gray-800'>
                                                1{/* {item.quantity}{' '} */}
                                            </p>
                                        </div>
                                        <div className='border-b border-gray-300'>
                                            <p className='text-gray-800'>
                                                {item.due_date &&
                                                    new Date(
                                                        item.due_date
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        MONTH_FORMAT
                                                    )}
                                            </p>
                                        </div>
                                        <div className='border-b border-gray-300'>
                                            <p className='sm:text-right text-gray-800'>
                                                {item.payment_amount} USD
                                            </p>
                                        </div>
                                    </React.Fragment>
                                ))}
                        </div>
                        <div className='sm:hidden border-b border-gray-200'></div>
                    </div>
                </div>

                <div className='mt-2 flex sm:justify-end col-span-2'>
                    <div className='sm:text-right space-y-2'>
                        <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
                            <dl className='grid sm:grid-cols-5 gap-x-3'>
                                <dt className='col-span-3 font-semibold text-gray-800'>
                                    Total:
                                </dt>
                                <dd className='col-span-2 text-gray-500'>
                                    {Number(details.total_amount)} USD
                                </dd>
                            </dl>
                            {details.total_amount_in_words && (
                                <dl className='grid sm:grid-cols-5 gap-x-3'>
                                    <dt className='col-span-3 font-semibold text-gray-800'>
                                        Total in words:
                                    </dt>
                                    <dd className='col-span-2 text-gray-500'>
                                        <em>
                                            {details.total_amount_in_words} USD
                                        </em>
                                    </dd>
                                </dl>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='my-4'>
                        <div className='my-2'>
                            <p className='font-semibold text-red-800'>
                                Additional notes:
                            </p>
                            <p className='font-regular text-gray-800'>
                                {details.additionalNotes}
                            </p>
                        </div>
                        <div className='my-2'>
                            <p className='font-semibold text-red-800'>
                                Payment terms:
                            </p>
                            <p className='font-regular text-gray-800'>
                                {details.paymentTerms}
                            </p>
                        </div>
                        <div className='my-2'>
                            <span className='font-semibold text-md text-gray-800'>
                                Please send the payment to this address
                                <p className='text-sm'>
                                    Bank: XXXX Bank
                                    {details.paymentInformation?.bankName}
                                </p>
                                <p className='text-sm'>
                                    Account name: XXXX
                                    {details.paymentInformation?.accountName}
                                </p>
                                <p className='text-sm'>
                                    Account no: XXXXXXXXX
                                    {details.paymentInformation?.accountNumber}
                                </p>
                            </span>
                        </div>
                    </div>
                    <p className='text-gray-500 text-sm'>
                        If you have any questions concerning this invoice, use
                        the following contact information:
                    </p>
                    <div>
                        <p className='block text-sm font-medium text-gray-800'></p>
                        <p className='block text-sm font-medium text-gray-800'></p>
                    </div>
                </div>
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate;
