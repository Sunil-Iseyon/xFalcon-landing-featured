import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { DemosSection } from '@/components/landing/DemosSection';
import { FooterSection } from '@/components/landing/FooterSection';
import { getDemoEntries, getLandingContent } from '@/lib/content';
import { encryptDemoPath } from '@/lib/demo-url';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Live Demo Portals — xFalcon',
  description:
    '30+ industry demo portals generated from a single prompt. Healthcare, Finance, Retail and more.',
  openGraph: {
    title: 'Live Demo Portals — xFalcon',
    description: '30+ industry demos, one prompt each.',
    url: 'https://www.xfalcon.ai/demos',
    siteName: 'xFalcon',
  },
};

export default async function DemosPage() {
  const [demos, landingContent] = await Promise.all([getDemoEntries(), getLandingContent()]);

  const items = [...demos]
    .sort((a, b) => {
      const aOrder =
        typeof a.order === 'number' && Number.isFinite(a.order)
          ? a.order
          : Number.MIN_SAFE_INTEGER;
      const bOrder =
        typeof b.order === 'number' && Number.isFinite(b.order)
          ? b.order
          : Number.MIN_SAFE_INTEGER;
      if (aOrder !== bOrder) return aOrder - bOrder; // ascending: demo1 first
      return a.title.localeCompare(b.title);
    })
    .map((demo) => ({
      ...demo,
      path: `/demos/go/${encryptDemoPath(demo.path)}`,
    }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <LandingNavbar logoHref="/" />

      {/* Page hero */}
      <div className="mx-auto max-w-4xl px-6 pb-10 pt-36 text-center">
        <p
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: 'var(--accent-glow)',
            marginBottom: '1.1rem',
          }}
        >
          LIVE DEMO PORTALS
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-buenard)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}
        >
          30+ industry demos,{' '}
          <span style={{ color: 'var(--accent-glow)' }}>one prompt each.</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter, sans-serif)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginTop: '0.75rem',
          }}
        >
          Every portal below was generated from a single slash command.{' '}
          Browse by industry or explore them all.
        </p>
      </div>

      {/* Demos grid — header already shown above */}
      <DemosSection
        items={items}
        eyebrow=""
        heading=""
        subheading=""
        primaryButtonLabel="View demo"
        secondaryButtonLabel="Browse all"
        showHeader={false}
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
    </div>
  );
}
