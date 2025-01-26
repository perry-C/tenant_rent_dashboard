import { useRef } from 'react';

interface DropdownProps {
    items: any[];
    label: string;
    options: string[];
    onSelect: any;
}
const Dropdown = ({
    items,
    label,
    options,
    onSelect,
    ...props
}: DropdownProps) => {
    const dropdownRef = useRef<any>(null);

    const closeDropdownList = () => {
        const CurDropdownRef = dropdownRef.current;

        if (!CurDropdownRef) return;
        if (!CurDropdownRef.hasAttribute('open')) return;
        CurDropdownRef.removeAttribute('open');
    };

    return (
        <details
            className='dropdown'
            ref={dropdownRef}
            onBlur={closeDropdownList}
            {...props}
        >
            <summary className='btn btn-outline m-1 sm:btn-sm md:btn-md lg:btn-md'>
                {label}
            </summary>
            <ul className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow sm:menu-sm md:menu-md lg:menu-lg'>
                {items.map((val, index) => (
                    <li key={index}>
                        <a
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => onSelect && onSelect(val)}
                            onMouseUp={() => closeDropdownList()}
                        >
                            {options[index] ?? ''}
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    );
};

export default Dropdown;
