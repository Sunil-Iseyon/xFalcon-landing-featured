import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { FooterSection } from '@/components/landing/FooterSection';
import { getLandingContent } from '@/lib/content';
import securityData from '@/content/legal/security-and-trust.json';
import { METADATA_BASE_URL } from '@/lib/app-config';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE_URL,
  title: 'Confidentiality, Liability & Usage Disclosure — xFalcon',
  description: securityData.description,
  openGraph: {
    title: 'Confidentiality, Liability & Usage Disclosure — xFalcon',
    description: securityData.description,
    type: 'website',
    url: '/security-and-trust',
    images: ['/brand/hero/og_1200x630.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confidentiality, Liability & Usage Disclosure — xFalcon',
    description: securityData.description,
    images: ['/brand/hero/og_1200x630.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/security-and-trust' },
};

export default async function SecurityAndTrustPage() {
  const landingContent = await getLandingContent();

  return (
    <>
      <LegalPageLayout
        title={securityData.title}
        description={securityData.description}
        lastUpdated={securityData.lastUpdated}
        sections={securityData.sections}
        contactEmail={securityData.contactSection.email}
        contactNo={securityData.contactSection.ContactNo}
        contactAddress={securityData.contactSection.address}
        contactTitle={securityData.contactSection.title}
      />
      <FooterSection
        logoSrc={landingContent.footer.logoSrc}
        logoAlt={landingContent.footer.logoAlt}
        companyName={landingContent.footer.companyName}
        companyDescription={landingContent.footer.companyDescription}
        tagline={landingContent.footer.tagline}
        sections={landingContent.footer.sections}
        socialLinks={landingContent.footer.socialLinks}
        contactInfo={landingContent.contactInfo}
        copyright={landingContent.footer.copyright}
      />
    </>
  );
}
