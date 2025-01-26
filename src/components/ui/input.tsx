import { useFormContext } from 'react-hook-form';

interface InputProps {
    name?: string;
    label?: string;
    placeholder?: string;
}

const Input = ({
    name = '',
    label = '',
    placeholder = '',
    ...props
}: InputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <label className='input input-bordered flex items-center gap-2 lg:input-lg md:input-md sm:input-sm'>
            <div className='font-bold lg:text-lg md:text-md sm:text-sm'>
                {label}
            </div>

            <input
                type='text'
                className='grow'
                placeholder={placeholder ? name : ''}
                {...props}
                {...register(name)}
            />

            <span className='text-error'>
                {errors[name]?.message?.toString()}
            </span>
        </label>
    );
};

Input.displayName = 'Input';

export default Input;
