interface SelectProps {
    options: string[];
    onChange?: (data: any) => void;
}

const Select = ({ options, ...props }: SelectProps) => {
    return (
        <select
            className='select lg:select-lg md:select-md sm:select-sm select-bordered w-full max-w-xs'
            {...props}
        >
            {options.map((val, index) => (
                <option key={index}>{val}</option>
            ))}
        </select>
    );
};

export default Select;
