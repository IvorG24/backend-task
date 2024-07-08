import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from '@/components/reactqueryprovider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Authentication | Todo',
  description: 'Authentication for todo app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-200 flex flex-col`}>
        <ReactQueryProvider> {children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
