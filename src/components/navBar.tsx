'use client';

import {
    ArrowLeftIcon,
    BellIcon,
    DrawerIcon,
    HomeIcon,
    InvoiceIcon,
    SearchIcon,
} from '@/lib/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NavBarLeft = (handleGoBack: () => void) => (
    <div className='navbar-start'>
        <div className='z-50'>
            <input
                id='left-sidebar'
                type='checkbox'
                className='drawer-toggle'
            />
            <div className='drawer-content'>
                {/* Page content here */}
                <label
                    tabIndex={0}
                    role='button'
                    htmlFor='left-sidebar'
                    className='btn btn-ghost btn-circle'
                >
                    <DrawerIcon />
                </label>
            </div>
            <div className='drawer-side'>
                <label
                    htmlFor='left-sidebar'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>
                <ul className='menu bg-base-200 text-base-content min-h-full w-60 p-4'>
                    {/* Sidebar content here */}
                    <li>
                        <Link href={'/tenants'}>
                            <HomeIcon />
                            Tenants
                        </Link>
                    </li>
                    <li>
                        <Link href='/addInvoice'>
                            <InvoiceIcon />
                            Invoice Maker
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <button className='btn btn-ghost btn-circle' onClick={handleGoBack}>
            <ArrowLeftIcon />
        </button>
    </div>
);

const NavBarCenter = () => (
    <div className='navbar-center'>
        <Link href='//' className='btn btn-ghost text-xl'>
            Tenant Rent Dashboard
        </Link>
    </div>
);

const NavBarRight = (userAlert: boolean) => (
    <div className='navbar-end'>
        <button
            className='btn btn-ghost btn-circle'
            onClick={() => alert('Global search feature under construction')}
        >
            <SearchIcon />
        </button>
        <button
            className='btn btn-ghost btn-circle'
            onClick={() => alert('Notification feature under construction')}
        >
            <div className='indicator'>
                <BellIcon />
                {userAlert && (
                    <span className='badge badge-xs badge-primary indicator-item'></span>
                )}
            </div>
        </button>
    </div>
);

const NavBar = () => {
    const [userAlert, setUserAlert] = useState(false);
    const router = useRouter();
    const handleGoBack = () => {
        const curUrl = window.location.href;
        const backUrl = curUrl.slice(0, curUrl.lastIndexOf('/') + 1);
        if (curUrl == backUrl) {
            alert('already at the home page');
        } else router.push(backUrl);
    };
    return (
        <div className='navbar'>
            {NavBarLeft(handleGoBack)}
            {NavBarCenter()}
            {NavBarRight(userAlert)}
        </div>
    );
};

export default NavBar;
