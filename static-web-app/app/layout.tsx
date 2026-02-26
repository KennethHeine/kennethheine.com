// --- file: app/layout.tsx ---
import { Layout } from '@/components/layout/Layout';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import './globals.css';

// SEO metadata for the entire site
export const metadata: Metadata = {
  title: {
    default:
      'Kenneth Heine - Technical Advisor for Project Leaders | Azure & Platform Delivery',
    template: '%s | Kenneth Heine',
  },
  description:
    'Kenneth Heine helps project leaders make technical decisions so the plan holds. Technical advisor for Azure cloud and platform projects — Predictable Delivery™.',
  keywords: [
    'Kenneth Heine',
    'Technical Advisor',
    'Project Leader',
    'Azure Cloud',
    'Platform Delivery',
    'Vendor Management',
    'Risk Assessment',
    'Go-Live Readiness',
    'Predictable Delivery',
    'DevOps',
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
    title: 'Kenneth Heine - Technical Advisor for Project Leaders',
    description:
      'Kenneth Heine helps project leaders make technical decisions so the plan holds. Technical advisor for Azure cloud and platform projects.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kenneth Heine - Technical Advisor for Project Leaders',
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
 * - Font loading and CSS variables
 * - Theme provider for dark/light mode
 * - Shared layout components (header, footer)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Google Fonts - loaded via link tags for Next.js 16+ compatibility */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body
        className={`font-sans antialiased`}
        style={
          {
            fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          } as React.CSSProperties
        }
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
