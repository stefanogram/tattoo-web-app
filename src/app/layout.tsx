import type { Metadata } from 'next';
import { Inter, Montserrat, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat', // Used as body font
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-cinzel-decorative', // Used as headline font
  weight: ['400', '700', '900'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Enos Tattoo Studio - Corfu | Custom Tattoos',
  description: 'Premier tattoo studio in Corfu. Talented artists specializing in custom designs, cover-ups, fine line, and more. Book your appointment today!',
  keywords: 'tattoo corfu, tattoo studio corfu, custom tattoo, enos tattoo, best tattoo greece',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          montserrat.variable,
          cinzelDecorative.variable
        )}
      >
        <Header />
        <main className="flex-shrink-0">{children}</main> {/* Ensure main content area can shrink if footer is large */}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
