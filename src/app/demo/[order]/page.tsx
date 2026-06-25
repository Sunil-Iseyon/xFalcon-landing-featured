import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FooterSection } from '@/components/landing/FooterSection';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { getDemoEntryByOrder, getLandingContent } from '@/lib/content';

interface DemoDetailPageProps {
  params: Promise<{ order: string }>;
}

export default async function DemoDetailPage({ params }: DemoDetailPageProps) {
  const { order: orderParam } = await params;
  const order = Number(orderParam);

  if (!Number.isInteger(order) || order <= 0) {
    notFound();
  }

  const [demo, landingContent] = await Promise.all([
    getDemoEntryByOrder(order),
    getLandingContent(),
  ]);
  if (!demo) {
    notFound();
  }

  const contactEmail = landingContent.contactInfo.email
    .replace(/^mailto:/i, '')
    .split('?')[0]
    .trim();
  const subjectPrefix = landingContent.demoDetail.contactSubjectPrefix;
  const contactSubject = encodeURIComponent(`${subjectPrefix}: ${demo.title}`);
  const contactBody = encodeURIComponent(
    `Hi xFalcon team,\n\nI am interested in the demo: ${demo.title}\n\nMy name is:\nMy email is:\nCompany:\n\nRequest details:\n`,
  );
  const contactHref = `mailto:${contactEmail}?subject=${contactSubject}&body=${contactBody}`;

  return (
    <>
      <main className="min-h-screen px-4 py-32 md:px-8 lg:px-12" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <LandingNavbar sectionBasePath="/" logoHref="/" />
        <div className="mx-auto w-full max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-black lg:text-5xl" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {demo.title}
            </h1>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-4">
            <Link
              href="/#demos"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
              style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--surface)' }}
            >
              <span aria-hidden="true">&larr;</span>
              {landingContent.demoDetail.backLabel}
            </Link>
            <a
              href={demo.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
              style={{ background: 'var(--accent-glow)', color: '#061122' }}
            >
              {landingContent.demoDetail.visitLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
            {demo.thumbnail ? (
              <img
                src={demo.thumbnail}
                alt={demo.title}
                className="h-72 w-full object-cover md:h-96"
              />
            ) : (
              <div className="flex h-72 items-center justify-center text-sm font-semibold md:h-96" style={{ color: 'var(--text-muted)' }}>
                {landingContent.demoDetail.previewFallbackLabel}
              </div>
            )}
          </div>

          <div className="mx-auto w-full max-w-3xl rounded-3xl p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)]" style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{landingContent.demoDetail.aboutHeading}</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {demo.description || landingContent.demoDetail.aboutFallbackDescription}
            </p>
          </div>

          <div id="contact" className="mx-auto w-full max-w-3xl rounded-3xl p-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]" style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{landingContent.demoDetail.contactHeading}</h3>
            <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>
              {landingContent.demoDetail.contactDescription}
            </p>
            <a
              href={contactHref}
              className="mt-6 inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
              style={{ background: 'var(--accent-glow)', color: '#061122' }}
            >
              {landingContent.demoDetail.contactButtonText}
            </a>
          </div>

        </div>
      </main>

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