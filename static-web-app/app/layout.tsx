// --- file: app/layout.tsx ---
import { Layout } from '@/components/layout/Layout';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Self-hosted fonts (next/font/local): no external requests, CSP-safe.
// "Signal & Ledger" type system: Bricolage Grotesque display, Archivo body,
// IBM Plex Mono for ledger labels and code.
const bricolage = localFont({
  src: './fonts/bricolage-grotesque-latin-wght.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-bricolage',
});

const archivo = localFont({
  src: './fonts/archivo-latin-wght.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-archivo',
});

const plexMono = localFont({
  src: [
    { path: './fonts/ibm-plex-mono-latin-400.woff2', weight: '400' },
    { path: './fonts/ibm-plex-mono-latin-600.woff2', weight: '600' },
  ],
  style: 'normal',
  display: 'swap',
  variable: '--font-plex-mono',
});

// SEO metadata for the entire site
export const metadata: Metadata = {
  title: {
    default:
      'Kenneth Heine - AI, Automation & Cloud Architecture for Developers',
    template: '%s | Kenneth Heine',
  },
  description:
    'Kenneth Heine is a DevOps engineer and cloud architect in Copenhagen. He helps development teams use AI, automation, and Azure to ship software with less manual work.',
  keywords: [
    'Kenneth Heine',
    'AI Automation',
    'DevOps',
    'Azure Cloud Architecture',
    'GitHub Copilot',
    'CI/CD',
    'Development Workflows',
    'GPT APIs',
    'Infrastructure as Code',
  ],
  authors: [{ name: 'Kenneth Heine' }],
  creator: 'Kenneth Heine',
  publisher: 'Kenneth Heine',
  metadataBase: new URL('https://kennethheine.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kennethheine.com',
    siteName: 'Kenneth Heine',
    title: 'Kenneth Heine - AI & Automation for Developers',
    description:
      'Kenneth Heine is a DevOps engineer and cloud architect in Copenhagen. He helps development teams use AI, automation, and Azure to ship software with less manual work.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kenneth Heine - AI & Automation for Developers',
      },
    ],
  },
  twitter: null,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
  },
};

/**
 * Root layout component for the entire application
 * This component wraps all pages and provides:
 * - Self-hosted font variables (CSP-safe, no external font requests)
 * - Theme provider for dark/light mode
 * - Shared layout components (header, footer)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${bricolage.variable} ${archivo.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
