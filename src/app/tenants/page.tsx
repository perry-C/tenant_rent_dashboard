'use client';

import TenantsTable from '@/components/tenantsTable';

export default function TenantsPage() {
    return (
        <div className='p-10 flex flex-col overflow-auto'>
            <TenantsTable />
        </div>
    );
}
