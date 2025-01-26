import Link from 'next/link';

const CreateTenant = () => (
    <div
        className='hero h-full'
        style={{
            backgroundImage:
                'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
    >
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-neutral-content text-center'>
            <div className='max-w-md'>
                <h1 className='mb-5 text-5xl font-bold'>Hello there</h1>
                <p className='mb-5'>
                    Please add a new tenant here to get started.
                </p>
                <Link href={'/addTenant'}>
                    <button className='btn btn-primary'>Add</button>
                </Link>
            </div>
        </div>
    </div>
);

export default CreateTenant;
