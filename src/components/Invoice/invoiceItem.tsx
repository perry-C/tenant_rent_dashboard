import { TrashIcon } from '@/lib/icons';
import { PaymentType } from '@prisma/client';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import Button from '../ui/button';
import Card from '../ui/card';
import DatePicker from '../ui/datePicker';
import Input from '../ui/input';
import Select from '../ui/select';

const InvoiceItem = ({
    removeItem,
    index,
}: {
    removeItem: UseFieldArrayRemove;
    index: number;
}) => {
    const { register, control } = useFormContext();

    const handleItemRemove = (index: number) => {
        removeItem(index);
    };
    return (
        <>
            <Card>
                <div className='flex gap-2 flex-wrap justify-evenly'>
                    <span className='flex-auto'>
                        {/* <Input></Input> */}
                        <Input
                            label='Amount'
                            {...register(
                                `details.invoice_items.${index}.payment_amount` as const
                            )}
                        ></Input>
                    </span>
                    <span className='flex-auto'>
                        <DatePicker
                            label='Due Month'
                            type='month'
                            {...register(
                                `details.invoice_items.${index}.due_date` as const
                            )}
                        />
                    </span>
                    <span className=''>
                        <Select
                            {...register(
                                `details.invoice_items.${index}.payment_type` as const
                            )}
                            options={Object.values(PaymentType)}
                        ></Select>
                    </span>
                    <span className=''>
                        <Button
                            ghost={true}
                            onClick={() => handleItemRemove(index)}
                        >
                            <TrashIcon />
                        </Button>
                    </span>
                </div>
            </Card>
            <div className='divider divider-primary py-4'>
                payment {index + 1}
            </div>
        </>
    );
};

export default InvoiceItem;
