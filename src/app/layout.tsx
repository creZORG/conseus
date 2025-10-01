import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingContact } from '@/components/floating-contact';

export const metadata: Metadata = {
  title: {
    default: 'Conquistar Enterprises | Reliable Supply of Food, Construction & Electronics',
    template: '%s | Conquistar Enterprises Limited'
  },
  description: 'Conquistar Enterprises Limited is a premier supply company in Kenya, offering reliable sourcing and delivery of foodstuffs, cereals, construction materials, electronics, and more. Your trusted partner for quality goods.',
  keywords: ['supply company Kenya', 'food suppliers', 'cereal suppliers', 'construction materials Kenya', 'electronics suppliers', 'educational lab equipment', 'electrical products', 'stationery suppliers', 'Conquistar Enterprises'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased"
      )}>
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingContact />
        <Toaster />
      </body>
    </html>
  );
}
