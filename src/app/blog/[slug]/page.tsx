import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from '@/lib/blog';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { FooterSection } from '@/components/landing/FooterSection';
import { getLandingContent } from '@/lib/content';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const ogImage = post.seo?.ogImage ?? post.heroImage ?? '/brand/hero/og_1200x630.png';
  return {
    title: `${title} — xFalcon Blog`,
    description,
    alternates: { canonical: post.seo?.canonical ?? `https://www.xfalcon.ai/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.xfalcon.ai/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: post.seo?.noindex ? { index: false } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, landingContent, adjacent, related] = await Promise.all([
    getPostBySlug(slug),
    getLandingContent(),
    getAdjacentPosts(slug),
    (async () => {
      const p = await getPostBySlug(slug);
      return p ? getRelatedPosts(slug, p.tags) : [];
    })(),
  ]);
  if (!post) notFound();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.heroImage ?? '/brand/hero/og_1200x630.png',
      datePublished: post.publishedAt,
      author: { '@type': 'Person', name: post.author.name },
      publisher: { '@type': 'Organization', name: 'xFalcon', url: 'https://www.xfalcon.ai' },
      url: `https://www.xfalcon.ai/blog/${slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.xfalcon.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.xfalcon.ai/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.xfalcon.ai/blog/${slug}` },
      ],
    },
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingNavbar logoHref="/" />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-40 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <li><Link href="/" style={{ color: 'var(--accent)' }} className="hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" style={{ color: 'var(--accent)' }} className="hover:underline">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate max-w-[20ch]" style={{ color: 'var(--text)' }}>{post.title}</li>
          </ol>
        </nav>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: 'rgba(46,209,237,0.10)', color: 'var(--accent-glow)', border: '1px solid rgba(46,209,237,0.2)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="font-display mb-5 leading-tight tracking-[-0.01em]"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: 'var(--text)' }}
        >
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          {post.author.avatar && (
            <Image src={post.author.avatar} alt={post.author.name} width={28} height={28} className="rounded-full" />
          )}
          <span style={{ color: 'var(--text-secondary)' }}>{post.author.name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>

        {/* Hero image */}
        {post.heroImage && (
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-xl sm:h-80">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt ?? post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Prose body rendered via react-markdown */}
        <article className="prose-chat max-w-none" style={{ color: 'var(--text)' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              a: ({ href, children }) => (
                <a href={href} style={{ color: 'var(--accent)' }} className="underline underline-offset-2 hover:opacity-80">
                  {children}
                </a>
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>
        </article>

        {/* Share + nav row */}
        <div
          className="mt-14 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.xfalcon.ai/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-2"
              style={{ color: 'var(--accent)' }}
            >
              Twitter/X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.xfalcon.ai/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-2"
              style={{ color: 'var(--accent)' }}
            >
              LinkedIn
            </a>
          </div>
          <Link href="/blog" className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
            ← All posts
          </Link>
        </div>

        {/* Prev / Next navigation */}
        {(adjacent.prev || adjacent.next) && (
          <nav
            aria-label="Post navigation"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {adjacent.prev ? (
              <Link
                href={`/blog/${adjacent.prev.slug}`}
                className="flex flex-col rounded-xl p-5 transition-shadow hover:shadow-md"
                style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}
              >
                <span className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
                  ← Previous
                </span>
                <span className="text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                  {adjacent.prev.title}
                </span>
              </Link>
            ) : <div />}
            {adjacent.next ? (
              <Link
                href={`/blog/${adjacent.next.slug}`}
                className="flex flex-col rounded-xl p-5 text-right transition-shadow hover:shadow-md"
                style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}
              >
                <span className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
                  Next →
                </span>
                <span className="text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                  {adjacent.next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="font-eyebrow mb-6"
              style={{ color: 'var(--accent-glow)' }}
            >
              RELATED POSTS
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="rounded-xl p-5 transition-shadow hover:shadow-md"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}
                >
                  <p className="mb-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {new Date(rp.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' · '}
                    {rp.readingTime} min read
                  </p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                    {rp.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA block */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}
        >
          <h2 className="font-display mb-3 text-xl font-bold" style={{ color: 'var(--text)' }}>
            Ready to see xFalcon in action?
          </h2>
          <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The hard parts of analytics, solved in days, not months.
          </p>
          <a
            href="mailto:info@iseyon.com?subject=Book%20a%20Demo"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
            style={{ background: 'var(--accent-glow)', color: '#061122' }}
          >
            Book a demo →
          </a>
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
    </div>
  );
}
