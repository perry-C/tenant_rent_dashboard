import { ReactNode } from 'react';

import classNames from 'classnames';

interface ButtonProps {
    children?: ReactNode;
    dashed?: boolean;
    ghost?: boolean;
    neutral?: boolean;
    primary?: boolean;
    responsive?: boolean;
    type?: 'button' | 'reset' | 'submit';
    onClick?: (arg: any) => void;
}

const Button = ({
    dashed = false,
    ghost = false,
    neutral = true,
    primary = false,
    // Default value for responsive is true, but can be turned off for more ingrained styling
    responsive = true,
    type = 'button',

    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={classNames(
                {
                    btn: true,
                },
                { 'sm:btn-sm md:btn-md lg:btn-lg': responsive },
                { 'btn-outline border-dashed border-2': dashed },
                { 'btn-ghost': ghost },
                { 'btn-neutral': neutral },
                { 'btn-primary': primary }
            )}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;
