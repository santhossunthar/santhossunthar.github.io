import type { Metadata, Viewport } from 'next'
import { Fira_Code, Montserrat, Orbitron, Oswald } from 'next/font/google'
import './globals.css'

export const dynamic = 'error'
export const revalidate = false

export const metadata: Metadata = {
  title: 'Santhos Suntharalingam - Security Researcher',
  description: 'Portfolio of Santhos Suntharalingam, Security Researcher and Software Engineer',
  // Mobile performance optimizations
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  }
}

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
