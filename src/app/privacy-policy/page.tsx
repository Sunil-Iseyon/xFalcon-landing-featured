import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { FooterSection } from '@/components/landing/FooterSection';
import { getLandingContent } from '@/lib/content';
import privacyData from '@/content/legal/privacy-policy.json';
import { METADATA_BASE_URL } from '@/lib/app-config';

export const metadata: Metadata = {
  metadataBase: METADATA_BASE_URL,
  title: 'Privacy Policy — xFalcon',
  description: privacyData.description,
  openGraph: {
    title: 'Privacy Policy — xFalcon',
    description: privacyData.description,
    type: 'website',
    url: '/privacy-policy',
    images: ['/brand/hero/og_1200x630.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — xFalcon',
    description: privacyData.description,
    images: ['/brand/hero/og_1200x630.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy-policy' },
};

export default async function PrivacyPolicyPage() {
  const landingContent = await getLandingContent();

  return (
    <>
      <LegalPageLayout
        title={privacyData.title}
        description={privacyData.description}
        lastUpdated={privacyData.lastUpdated}
        sections={privacyData.sections}
        contactEmail={privacyData.contactSection.email}
        contactNo={privacyData.contactSection.ContactNo}
        contactAddress={privacyData.contactSection.address}
        contactTitle={privacyData.contactSection.title}
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
