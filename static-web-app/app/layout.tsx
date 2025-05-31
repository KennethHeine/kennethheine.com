// --- file: app/layout.tsx ---
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components/Layout'
import { ThemeProvider } from '@/components/ThemeProvider'

// Configure Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

// SEO metadata for the entire site
export const metadata: Metadata = {
  title: {
    default: 'Kenneth Heine - Full-Stack Developer',
    template: '%s | Kenneth Heine'
  },
  description: 'Personal website of Kenneth Heine, a passionate full-stack developer specializing in modern web technologies.',
  keywords: ['Kenneth Heine', 'Full-Stack Developer', 'Web Development', 'TypeScript', 'React', 'Next.js'],
  authors: [{ name: 'Kenneth Heine' }],
  creator: 'Kenneth Heine',
  publisher: 'Kenneth Heine',
  metadataBase: new URL('https://kennethheine.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kennethheine.com',
    siteName: 'Kenneth Heine',
    title: 'Kenneth Heine - Full-Stack Developer',
    description: 'Personal website of Kenneth Heine, a passionate full-stack developer specializing in modern web technologies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kenneth Heine - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenneth Heine - Full-Stack Developer',
    description: 'Personal website of Kenneth Heine, a passionate full-stack developer specializing in modern web technologies.',
    images: ['/og-image.jpg'],
  },
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
}

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
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
