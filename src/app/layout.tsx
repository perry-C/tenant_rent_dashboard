import NavBar from '@/components/navBar';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='w-screen h-screen flex flex-col'>
                {/* <body className={inter.className}> */}
                <div className='h-24'>
                    <NavBar />
                </div>
                {children}
            </body>
        </html>
    );
}
