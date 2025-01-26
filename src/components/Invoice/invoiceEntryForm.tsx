import Input from '@/components/ui/input';
import { InvoiceType } from '@/types';
import { Tenant as PrismaTenant } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Dropdown from '../dropdown';
import InvoiceItemEntryForm from './invoiceItemEntryForm';

interface Tenant extends PrismaTenant {
    flat_number?: string;
    room_number?: string;
}

interface InvoiceEntryFormProps {
    formData: InvoiceType;
    tenants: Tenant[];
}

const InvoiceEntryForm = ({
    formData,
    tenants,
    ...props
}: InvoiceEntryFormProps) => {
    const { register, setValue } = useFormContext();
    const [tenantSelected, setTenantSelected] = useState<Tenant>();

    useEffect(() => {
        if (tenantSelected) {
            axios
                .get(`/api/contracts?tenantId=${tenantSelected.id}`)
                .then((res) => {
                    tenantSelected.flat_number = res.data.flat_number;
                    tenantSelected.room_number = res.data.room_number;
                    setValue('receiver', tenantSelected);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [tenantSelected]);

    return (
        <>
            <span className='flex justify-end'>
                <Dropdown
                    options={tenants.map((val) => {
                        return val.first_name + ' ' + val.first_name;
                    })}
                    items={tenants}
                    label='Select Tenant'
                    onSelect={setTenantSelected}
                />
            </span>

            <form className='grid grid-cols-2 grid-rows-4 child:m-2'>
                {/* sender */}
                <section className='space-y-2 col-span-1 row-span-1'>
                    <span className='text-xl font-bold'>Sender</span>
                    <Input
                        label='First Name'
                        {...register('sender.first_name')}
                    ></Input>
                    <Input
                        label='Last Name'
                        {...register('sender.last_name')}
                    ></Input>
                </section>
                {/* receiver */}
                <section className='space-y-2 col-span-1 row-span-1'>
                    <div className='flex justify-between items-start'>
                        <span className='text-xl font-bold'>Receiver</span>
                    </div>

                    <Input
                        label='First Name'
                        {...register('receiver.first_name')}
                    ></Input>
                    <Input
                        label='Last Name'
                        {...register('receiver.last_name')}
                    ></Input>
                    <Input
                        label='Flat Number'
                        {...register('receiver.flat_number')}
                    ></Input>
                    <Input
                        label='Room Number'
                        {...register('receiver.room_number')}
                    ></Input>
                </section>
                {/* payment items */}
                <section className='space-y-2 col-span-2 row-span-3'>
                    <InvoiceItemEntryForm />
                </section>
            </form>
        </>
    );
};

export default InvoiceEntryForm;
