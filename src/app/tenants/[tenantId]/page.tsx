'use client';

import PaymentsTable from '@/components/paymentsTable';
import Card from '@/components/ui/card';
import { Contract, Payment, PaymentType, Tenant } from '@prisma/client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TenantProfilePage() {
    const urlParams = useParams();
    // Fetch user profile info using user id passed in as a URL parameter
    const [tenant, setTenant] = useState<Tenant>();
    const [contract, setContract] = useState<Contract>();
    const [payments, setPayments] = useState<Payment[]>();
    const [totalRentLeft, setTotalRentLeft] = useState<number>(0);
    const [monthlyRentLeft, setMonthlyRentLeft] = useState<number>(0);

    useEffect(() => {
        const ac = new AbortController();
        let promises: Promise<any>[] = [];

        promises.push(axios.get('/api/tenants/' + urlParams.tenantId));
        promises.push(
            axios.get(`/api/contracts?tenantId=${urlParams.tenantId}`)
        );
        promises.push(
            axios.get(`/api/payments?tenantId=${urlParams.tenantId}`)
        );

        const tenantProfile = Promise.all(promises)
            .then((res) => {
                setTenant(res[0].data);
                setContract(res[1].data);
                setPayments(res[2].data);
            })
            .catch((err) => console.log(err));

        return () => {
            ac.abort();
        };
    }, []);

    useEffect(() => {
        calcTotalToPay('RENT');
        calcTotalToPay('EAC');
        calcTotalToPay('DEPOSIT');
        calcTotalToPay('WATER');
        calcMonthlyRentLeft();
    }, [payments]);

    const calcTotalToPay = (paymentType: PaymentType) => {
        if (!contract) return;
        let totalRent = 0;
        totalRent = Number(contract.monthly_rent) * contract.tenancy_length;

        let rentPaid = 0;
        if (payments) {
            let rentPayments = payments.filter(
                (payment) => payment.payment_type === paymentType
            );

            rentPaid = rentPayments.reduce(
                (cmlAmount, curPayment) =>
                    cmlAmount + Number(curPayment.payment_amount),
                rentPaid
            );
        }
        const totalRentLeft = totalRent - rentPaid;
        setTotalRentLeft(totalRentLeft);
    };

    const calcMonthlyRentLeft = () => {
        const curDate = new Date();
        // const curDate = new Date('2024-12-13');
        const curDay = curDate.getDate();
        const rentCollectDay = 15;
        const rentCollectMonth =
            curDay <= rentCollectDay
                ? curDate.getMonth()
                : curDate.getMonth() + 1;

        // Find the rent payment history for the current month
        const curMonthPayments =
            payments?.filter((payment) => {
                const paymentDate = new Date(payment.payment_date);
                return paymentDate.getMonth() === rentCollectMonth;
            }) || [];

        // Calculate the total rent paid for the current month
        const monthlyRentPaid = curMonthPayments.reduce(
            (cmlAmount, curPayment) =>
                cmlAmount + Number(curPayment.payment_amount),
            0
        );

        // Calculate the total rent due for the current month
        const monthlyRentDue = Number(contract?.monthly_rent) - monthlyRentPaid;
        setMonthlyRentLeft(monthlyRentDue);
    };

    // TODO: tenant payment history as a table

    return (
        <>
            <div className='h-screen p-10 overflow-auto grid grid-cols-5 grid-rows-5 gap-4'>
                <div id='user-info-section' className='col-span-2 row-span-3'>
                    <Card type='primary'>
                        <h2 className='card-title'>
                            {tenant?.first_name} {tenant?.last_name}
                        </h2>
                        <span>
                            {`Room: ${contract?.flat_number}${contract?.room_number}`}
                        </span>
                        <span>Nationality: {tenant?.nationality}</span>
                        <span>
                            Move In Date:{' '}
                            {contract?.move_in_date &&
                                new Date(
                                    contract?.move_in_date?.toString()
                                ).toLocaleDateString()}
                        </span>
                        <span>
                            Move Out Date:{' '}
                            {contract?.move_out_date &&
                                new Date(
                                    contract?.move_out_date?.toString()
                                ).toLocaleDateString()}
                        </span>
                        <span>Contract ID: {contract?.contract_id}</span>
                        <span>
                            Rent Amount: {contract?.monthly_rent.toString()}
                        </span>
                    </Card>
                </div>
                <div
                    id='contract-info-section'
                    className='col-span-3 row-span-3'
                >
                    <Card>
                        <div>
                            <span>Monthly Rent To Be Collected:</span>
                            <span
                                className={`${
                                    monthlyRentLeft > 0
                                        ? 'text-error'
                                        : 'text-success'
                                }`}
                            >
                                {monthlyRentLeft.toString()}
                            </span>
                        </div>
                        <div>
                            <span>Total Rent To Be Collected:</span>
                            <span>{totalRentLeft.toString()}</span>
                        </div>
                        <div>
                            <span>EAC Desposit To Be Collected: </span>
                            <span>{contract?.eac_bill_deposit.toString()}</span>
                        </div>
                        <div>
                            <span>WATER Desposit To Be Collected:</span>
                            <span>{contract?.eac_bill_deposit.toString()}</span>
                        </div>
                    </Card>
                </div>
                <div className='col-span-5 row-span-2 '>
                    <PaymentsTable payments={payments} />
                </div>
            </div>
        </>
    );
}
