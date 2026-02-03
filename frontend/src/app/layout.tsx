import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Premium E-commerce Shop',
    description: 'A dedicated shopping platform.',
};

import { Chatbot } from '@/components/Chatbot';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>
                    <Navbar />
                    <main className="min-h-screen bg-slate-950 text-slate-100">
                        {children}
                    </main>
                    <Chatbot />
                </CartProvider>
            </body>
        </html>
    );
}
