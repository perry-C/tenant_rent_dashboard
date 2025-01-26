import { Payment } from '@prisma/client';

const tableHeaders = [
    'payment_id',
    'payment_date',
    'payment_amount',
    'payment_type',
    'rent_month',
];

const PaymentsTable = (props: { payments?: Payment[] }) => {
    const tableRows = props.payments?.map((payment: Payment, index) => (
        <tr key={index} className='text-left'>
            <td>{payment.payment_id}</td>
            <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
            <td>{payment.payment_amount.toString()}</td>
            <td>{payment.payment_type.toString()}</td>

            <td>
                {payment.rent_month
                    ? `${new Date(payment.rent_month).getMonth()}/${new Date(
                          payment.rent_month
                      ).getFullYear()}`
                    : null}
            </td>
        </tr>
    ));
    const tableRowsSkeleton = (
        <>
            {[...Array(3)].map((_, index) => (
                <tr key={index}>
                    {[...Array(4)].map((_, index) => (
                        <td key={index}>
                            <div className='skeleton h-4 w-full'></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
    return (
        <table className='table flex w-full '>
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index} className='text-left'>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            {<tbody>{props.payments ? tableRows : tableRowsSkeleton}</tbody>}
        </table>
    );
};

export default PaymentsTable;
