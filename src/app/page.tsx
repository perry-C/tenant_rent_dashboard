import Card from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
    return (
        <div className='grid m-4 grid-cols-2 grid-row-2 gap-8 overflow-auto'>
            <Card imgUrl='/invoice_landing.jpg'>
                <Link
                    className='btn flex flex-grow text-3xl opacity-80'
                    href='/addInvoice'
                >
                    <button>Invoice Maker</button>
                </Link>
            </Card>
            <Card imgUrl='/new_tenant_landing.jpg'>
                <Link
                    className='btn flex flex-grow text-3xl opacity-80'
                    href='/addTenant'
                >
                    <button className=''>Create New Tenant</button>
                </Link>
            </Card>
            <Card imgUrl='/existing_tenants_landing.jpg'>
                <Link
                    className='btn flex flex-grow text-3xl opacity-80'
                    href='/tenants'
                >
                    <button>Existing Tenants</button>
                </Link>
            </Card>
        </div>
    );
}
