import { useFormContext } from 'react-hook-form';

interface InputProps {
    name: string;
    type?: 'date' | 'month';
    label?: string;
    value?: string;
    placeholder?: string;
}

const DatePicker = ({
    name = '',
    type = 'date',
    label = '',
    value,
    placeholder,
    ...props
}: InputProps) => {
    const { register } = useFormContext();
    return (
        <label className='input input-bordered flex items-center gap-2 lg:input-lg md:input-md sm:input-sm'>
            <div className='font-bold'>{label}</div>
            <input
                type={type}
                className='grow'
                placeholder={placeholder ? name : ''}
                value={value}
                {...props}
                {...register(name)}
            />
        </label>
    );
};
DatePicker.displayName = 'DatePicker';

export default DatePicker;
