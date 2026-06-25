import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { FooterSection } from '@/components/landing/FooterSection';
import { getLandingContent } from '@/lib/content';
import { BlogFilter } from '@/components/blog/BlogFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — xFalcon',
  description: 'Feature deep-dives, product updates, and guides from the xFalcon team.',
  alternates: {
    canonical: 'https://www.xfalcon.ai/blog',
    types: { 'application/rss+xml': 'https://www.xfalcon.ai/blog/rss.xml' },
  },
  openGraph: {
    title: 'Blog — xFalcon',
    description: 'Feature deep-dives, product updates, and guides from the xFalcon team.',
    url: 'https://www.xfalcon.ai/blog',
    images: [{ url: '/brand/hero/og_1200x630.png', width: 1200, height: 630, alt: 'xFalcon Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — xFalcon',
    description: 'Feature deep-dives, product updates, and guides from the xFalcon team.',
    images: ['/brand/hero/og_1200x630.png'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.xfalcon.ai' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.xfalcon.ai/blog' },
  ],
};

export default async function BlogIndexPage() {
  const [posts, landingContent] = await Promise.all([getAllPosts(), getLandingContent()]);

  const tags = Array.from(
    new Set(posts.flatMap((p) => p.tags).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <LandingNavbar logoHref="/" />

      {/* Page header */}
      <header className="mx-auto max-w-7xl px-4 pb-12 pt-40 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <li><Link href="/" style={{ color: 'var(--accent)' }} className="hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: 'var(--text)' }}>Blog</li>
          </ol>
        </nav>
        <p className="font-eyebrow mb-3" style={{ color: 'var(--accent-glow)' }}>BLOG</p>
        <h1
          className="font-display max-w-2xl leading-tight tracking-[-0.01em]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text)' }}
        >
          Features, product updates, and guides
        </h1>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="py-24 text-center text-lg" style={{ color: 'var(--text-muted)' }}>
            No posts yet — check back soon.
          </p>
        ) : (
          <BlogFilter posts={posts} tags={tags} />
        )}
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
    </div>
  );
}
