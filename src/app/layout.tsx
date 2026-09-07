import type { Metadata, Viewport } from 'next'
import { Fira_Code, Montserrat, Orbitron, Oswald } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
import './globals.css'

export const dynamic = 'error'
export const revalidate = false

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Santhos Suntharalingam | Cybersecurity Engineer',
    template: '%s | Santhos Suntharalingam',
  },

  description:
    'Cybersecurity Engineer specializing in offensive security, penetration testing, cloud security, threat detection, incident response, and security automation.',

  authors: [
    {
      name: 'Santhos Suntharalingam',
      url: SITE_URL,
    },
  ],

  creator: 'Santhos Suntharalingam',

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: 'website',
    siteName: 'Santhos Suntharalingam',
    title: 'Santhos Suntharalingam | Cybersecurity Engineer',
    description:
      'Cybersecurity Engineer specializing in offensive security, cloud security, threat detection, and security automation.',
    url: SITE_URL,

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Santhos Suntharalingam - Cybersecurity Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Santhos Suntharalingam | Cybersecurity Engineer',
    description:
      'Cybersecurity Engineer specializing in offensive security, cloud security, and threat detection.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-main',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-about-body',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fira-code',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-orbitron',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${montserrat.variable} ${firaCode.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  )
}
