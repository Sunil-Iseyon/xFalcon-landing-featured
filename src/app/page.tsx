import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { CTASection } from '@/components/landing/CTASection';
import { FooterSection } from '@/components/landing/FooterSection';
import { DemoWallSection } from '@/components/landing/DemoWallSection';
import { LandingScrollShell } from '@/components/LandingScrollShell';
import { getDemoEntries, getLandingContent } from '@/lib/content';
import { encryptDemoPath } from '@/lib/demo-url';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'xFalcon — The Operating System for Enterprise Intelligence',
  description:
    'The hard parts of analytics, solved in days, not months. 75–93% lower TCO. Live in 4–6 weeks. Zero data migration.',
  openGraph: {
    title: 'xFalcon — The Operating System for Enterprise Intelligence',
    description:
      'The hard parts of analytics, solved in days, not months. 75–93% lower TCO. Live in 4–6 weeks. Zero data migration.',
    url: 'https://www.xfalcon.ai',
    siteName: 'xFalcon',
    images: [
      {
        url: '/brand/hero/og_1200x630.png',
        width: 1200,
        height: 630,
        alt: 'xFalcon — AI Business Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xFalcon — The Operating System for Enterprise Intelligence',
    description: 'The hard parts of analytics, solved in days, not months.',
    images: ['/brand/hero/og_1200x630.png'],
  },
  alternates: {
    canonical: 'https://www.xfalcon.ai',
  },
};

export default async function LandingPage() {
  const [landingContent, demos] = await Promise.all([
    getLandingContent(),
    getDemoEntries(),
  ]);

  const demosForSection = [...demos]
    .sort((a, b) => {
      const aOrder = typeof a.order === 'number' && Number.isFinite(a.order) ? a.order : Number.MIN_SAFE_INTEGER;
      const bOrder = typeof b.order === 'number' && Number.isFinite(b.order) ? b.order : Number.MIN_SAFE_INTEGER;
      if (aOrder !== bOrder) return bOrder - aOrder;
      return a.title.localeCompare(b.title);
    })
    .map((demo) => ({
      ...demo,
      path: `/demos/go/${encryptDemoPath(demo.path)}`,
    }));

  return (
    <LandingScrollShell>
      {/* Hero — Slide 3 layout */}
      <HeroSection
        eyebrow={landingContent.hero.eyebrow}
        heading={landingContent.hero.heading}
        subtitle={landingContent.hero.subtitle}
        ctaText={landingContent.hero.ctaText}
        ctaHref={landingContent.hero.ctaHref}
        rotatingWords={landingContent.hero.rotatingWords}
        previewImageSrc={landingContent.overview.imageSrc}
      />

      {/* How it works — sticky-pin scrollytelling */}
      <HowItWorksSection />

      {/* Demo wall — compact grid teaser linking to /demos */}
      {demos.length ? (
        <DemoWallSection items={demosForSection} total={demos.length} />
      ) : null}

      {/* CTA */}
      <CTASection
        heading={landingContent.cta.heading}
        description={landingContent.cta.description}
        contactEmail={landingContent.contactInfo.email}
        primaryCTA={landingContent.cta.primaryCTA}
      />

      {/* Footer */}
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
    </LandingScrollShell>
  );
}
