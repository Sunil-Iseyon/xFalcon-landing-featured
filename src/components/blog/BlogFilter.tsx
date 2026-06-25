'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';

const POSTS_PER_PAGE = 6;

const TAG_COLORS: Record<string, string> = {
  Features:    'rgba(46,209,237,0.12)',
  Product:     'rgba(46,209,237,0.08)',
  Guides:      'rgba(46,209,237,0.06)',
  Engineering: 'rgba(46,209,237,0.10)',
};

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-lg"
      style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}
      aria-label={`Read: ${post.title}`}
    >
      {post.heroImage && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt ?? post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{
                background: TAG_COLORS[tag] ?? 'rgba(46,209,237,0.08)',
                color: 'var(--accent-glow)',
                border: '1px solid rgba(46,209,237,0.15)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold leading-snug" style={{ color: 'var(--text)' }}>
          {post.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {post.excerpt}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {' · '}
          {post.readingTime} min read
        </p>
      </div>
    </Link>
  );
}

interface BlogFilterProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogFilter({ posts, tags }: BlogFilterProps) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [page, setPage] = useState(1);

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
  };

  const isFiltered = selectedTag !== 'All';
  const featured = posts[0] ?? null;
  const gridPosts = isFiltered
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts.slice(1);

  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paginated = gridPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <>
      {/* Tag filter bar */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter posts by tag">
        {['All', ...tags].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagChange(tag)}
            aria-pressed={selectedTag === tag}
            className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all"
            style={
              selectedTag === tag
                ? { background: 'rgba(46,209,237,0.15)', border: '1px solid rgba(46,209,237,0.5)', color: 'var(--accent-glow)' }
                : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured post — only when showing all */}
      {!isFiltered && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="mb-12 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl transition-shadow hover:shadow-xl lg:grid-cols-2"
          style={{ border: '1px solid var(--border)', background: 'var(--surface-raised)' }}
          aria-label={`Read: ${featured.title}`}
        >
          {featured.heroImage && (
            <div className="relative min-h-56 overflow-hidden lg:min-h-72">
              <Image
                src={featured.heroImage}
                alt={featured.heroImageAlt ?? featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          )}
          <div className="flex flex-col gap-4 p-8">
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: TAG_COLORS[tag] ?? 'rgba(46,209,237,0.08)',
                    color: 'var(--accent-glow)',
                    border: '1px solid rgba(46,209,237,0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold leading-snug tracking-tight" style={{ color: 'var(--text)' }}>
              {featured.title}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {featured.excerpt}
            </p>
            <p className="mt-auto text-sm" style={{ color: 'var(--text-muted)' }}>
              {new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {featured.readingTime} min read
            </p>
          </div>
        </Link>
      )}

      {/* Post grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-lg" style={{ color: 'var(--text-muted)' }}>
          No posts tagged &ldquo;{selectedTag}&rdquo; yet.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all disabled:opacity-40"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--surface)' }}
          >
            ← Previous
          </button>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all disabled:opacity-40"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--surface)' }}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
