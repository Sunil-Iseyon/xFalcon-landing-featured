import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { FooterSection } from '@/components/landing/FooterSection';
import { getLandingContent } from '@/lib/content';
import termsData from '@/content/legal/terms-and-conditions.json';
import { METADATA_BASE_URL } from '@/lib/app-config';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE_URL,
  title: 'Terms & Conditions — xFalcon',
  description: termsData.description,
  openGraph: {
    title: 'Terms & Conditions — xFalcon',
    description: termsData.description,
    type: 'website',
    url: '/terms-and-conditions',
    images: ['/brand/hero/og_1200x630.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions — xFalcon',
    description: termsData.description,
    images: ['/brand/hero/og_1200x630.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms-and-conditions' },
};

export default async function TermsAndConditionsPage() {
  const landingContent = await getLandingContent();

  return (
    <>
      <LegalPageLayout
        title={termsData.title}
        description={termsData.description}
        lastUpdated={termsData.lastUpdated}
        sections={termsData.sections}
        contactEmail={termsData.contactSection.email}
        contactNo={termsData.contactSection.ContactNo}
        contactAddress={termsData.contactSection.address}
        contactTitle={termsData.contactSection.title}
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
