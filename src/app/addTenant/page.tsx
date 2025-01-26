'use client';

import CountryInput from '@/components/countrySelector';
import DatePicker from '@/components/ui/datePicker';
import Input from '@/components/ui/input';
import { tenantCreationSchema } from '@/lib/validationSchemas';
import { TenantCreationSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function AddTenant() {
    const methods = useForm<TenantCreationSchema>({
        resolver: zodResolver(tenantCreationSchema),
    });

    const {
        handleSubmit,
        formState: { errors },
    } = methods;

    const [hasContract, setHasContract] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: object) => {
        data = { ...data, hasContract: hasContract };
        let newTenant;
        try {
            newTenant = await axios.post('/api/tenants', data);
        } catch (error) {
            alert(error);
        }

        if (newTenant?.status == 201) {
            router.push('/tenants');
        } else {
            alert('something went wrong');
        }
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);
    return (
        <div className='mx-auto p-10 flex flex-col overflow-auto'>
            <FormProvider {...methods}>
                <form
                    action='submit'
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-4'
                >
                    <div className='text-2xl font-bold'>Tenant Info</div>
                    <Input name='first_name' label='Tenant First Name'></Input>
                    <Input name='last_name' label='Tenant Last Name'></Input>
                    <CountryInput name='nationality' />
                    <Input name='tel' label='Telephone'></Input>
                    <button
                        type='button'
                        onClick={() => setHasContract(!hasContract)}
                        className='btn btn-outline btn-primary border-dashed border-2'
                    >
                        Has a contract ?
                    </button>

                    {hasContract && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='flex flex-col space-y-4'
                        >
                            <div className='text-2xl font-bold'>
                                Contract Info
                            </div>
                            <Input
                                name='flat_number'
                                label='Flat Number'
                            ></Input>
                            <span className='error-message'></span>
                            <Input
                                name='room_number'
                                label='Room Number'
                            ></Input>
                            <div className='flex space-x-4'>
                                <DatePicker
                                    label='Move In Date'
                                    name='move_in_date'
                                />
                                <DatePicker
                                    label='Move Out Date'
                                    name='move_out_date'
                                />
                            </div>

                            <Input
                                name='tenancy_length'
                                label='Tenancy Length'
                            ></Input>
                            <Input
                                name='deposit_amount'
                                label='Deposit Amount'
                            ></Input>
                            <Input
                                name='monthly_rent'
                                label='Monthly Rent Amount'
                            ></Input>
                            <Input
                                name='eac_bill_deposit'
                                label='EAC Deposit Amount'
                            ></Input>
                            <Input
                                name='water_bill_deposit'
                                label='Water Deposit Amount'
                            ></Input>
                        </motion.div>
                    )}

                    <button type='submit' className='btn btn-primary'>
                        Create
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}
