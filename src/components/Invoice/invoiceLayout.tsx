import { ReactNode } from 'react';

// Types
// import { InvoiceType } from '@/types';

type InvoiceLayoutProps = {
    children: ReactNode;
};

export default function InvoiceLayout({ children }: InvoiceLayoutProps) {
    // const { sender, receiver, details } = data;

    // Instead of fetching all signature fonts, get the specific one user selected.

    return (
        <>
            <link
                href='https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'
                rel='stylesheet'
            ></link>
            <section style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className='flex flex-col p-4 sm:p-10 bg-white rounded-xl min-h-[60rem]'>
                    {children}
                </div>
            </section>
        </>
    );
}
