import type { Metadata } from 'next'
import {
  expertiseContent,
  mainSectionConfig,
  socialLinks,
} from '@/data/constants'
import { absoluteUrl, SITE_URL } from '@/lib/site'
import Home from '@/pages/Home'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Santhos Suntharalingam',
      url: SITE_URL,
      image: absoluteUrl(mainSectionConfig.profile.imageSrc),
      jobTitle: 'Cybersecurity Engineer',
      description: mainSectionConfig.profile.summary,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: mainSectionConfig.profile.university,
      },
      knowsAbout: expertiseContent.items,
      sameAs: socialLinks
        .map(({ href }) => href)
        .filter((href) => href.startsWith('https://')),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  )
}
