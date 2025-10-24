import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Santhos Suntharalingam - Security Researcher',
  description: 'Portfolio of Santhos Suntharalingam, Security Researcher and Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
