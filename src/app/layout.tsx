import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';  // This is correct - keep this import

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ali Jifi-Bahlool - Portfolio',
  description: 'Full Stack Developer & AI Engineer focusing on artificial intelligence, web development, and cybersecurity.',
  robots: 'index, follow',
};

const getBasePath = () => process.env.NODE_ENV === 'production' ? '/ali-jifi.github.io' : '';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.className}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          rel="icon" 
          href={`${getBasePath()}/favicon.ico`} 
          type="image/x-icon" 
          sizes="16x16" 
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}