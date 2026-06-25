'use client';

import Image from 'next/image';
import { memo, useMemo, useRef, useState } from 'react';
import { MotionReveal } from '@/components/landing/MotionReveal';
import type { DemoEntry } from '@/lib/content';

interface DemosSectionProps {
  items: DemoEntry[];
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  showHeader?: boolean;
}

function getShortDescription(description: string, maxLength = 110): string {
  if (description.length <= maxLength) return description;
  const trimmed = description.slice(0, maxLength);
  const lastSpaceIndex = trimmed.lastIndexOf(' ');
  return `${lastSpaceIndex > 0 ? trimmed.slice(0, lastSpaceIndex) : trimmed}...`;
}

function getWaveDelay(index: number): number {
  return Math.floor(index / 3) * 0.18 + (index % 3) * 0.1;
}

interface DemoCardProps {
  demo: DemoEntry;
  delay: number;
  showNewTag: boolean;
}

const DemoCard = memo(function DemoCard({ demo, delay, showNewTag }: DemoCardProps) {
  return (
    <MotionReveal delay={delay} className="h-full">
      <a
        href={demo.path}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ED1ED] focus-visible:ring-offset-2"
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--border)',
        }}
      >
        {showNewTag && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
            style={{ background: 'rgba(46,209,237,0.15)', color: 'var(--accent-glow)', border: '1px solid rgba(46,209,237,0.3)' }}
          >
            New
          </span>
        )}

        {/* Thumbnail or empty placeholder */}
        {demo.thumbnail ? (
          <div
            className="relative mb-3 h-36 w-full overflow-hidden rounded-xl"
            style={{ background: 'var(--surface)' }}
          >
            <Image
              src={demo.thumbnail}
              alt={demo.title}
              fill
              sizes="(min-width: 1024px) 30rem, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Category chip */}
        {demo.category ? (
          <span
            className="mb-2 self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--accent-glow)', background: 'rgba(46,209,237,0.10)', border: '1px solid rgba(46,209,237,0.20)' }}
          >
            {demo.category}
          </span>
        ) : null}

        <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--text)' }}>
          {demo.title}
        </h3>

        {demo.description ? (
          <p className="mt-1.5 flex-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {getShortDescription(demo.description)}
          </p>
        ) : null}

        <span
          className="mt-3 text-sm font-semibold transition-colors group-hover:opacity-80"
          style={{ color: 'var(--accent-glow)' }}
        >
          View demo →
        </span>
      </a>
    </MotionReveal>
  );
});

export function DemosSection({
  items,
  eyebrow,
  heading,
  subheading,
  primaryButtonLabel,
  secondaryButtonLabel,
  showHeader = true,
}: DemosSectionProps) {
  void primaryButtonLabel;
  void secondaryButtonLabel;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    categoryScrollRef.current?.scrollBy({ left: direction === 'left' ? -250 : 250, behavior: 'smooth' });
  };

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const item of items) {
      const cat = item.category?.trim();
      if (cat && !seen.has(cat.toLowerCase())) seen.set(cat.toLowerCase(), cat);
    }
    return ['All', ...Array.from(seen.values()).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const isDefaultMobileCarousel = selectedCategory === 'All' && normalizedSearch.length === 0;

  const recentPaths = useMemo(() => new Set(items.slice(0, 3).map((i) => i.path)), [items]);

  const filteredItems = useMemo(() =>
    items.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category?.trim().toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !normalizedSearch || item.title.toLowerCase().includes(normalizedSearch) || (item.description ?? '').toLowerCase().includes(normalizedSearch);
      return matchCat && matchSearch;
    }),
    [items, normalizedSearch, selectedCategory],
  );

  const hasNoResults = normalizedSearch.length > 0 && filteredItems.length === 0;

  return (
    <section
      id="demos"
      data-scroll-section
      className="scroll-mt-28 px-4 pt-16 pb-20 md:px-8 lg:px-12 lg:pt-24 lg:pb-32"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Header */}
        {showHeader && (
          <div className="text-center space-y-4">
            <MotionReveal>
              <p className="font-eyebrow" style={{ color: 'var(--accent-glow)' }}>{eyebrow}</p>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <h2
                className="font-display text-4xl font-bold lg:text-5xl"
                style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
              >
                {heading}
              </h2>
            </MotionReveal>
            <MotionReveal delay={0.16}>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {subheading}
              </p>
            </MotionReveal>
          </div>
        )}

        {/* Search */}
        <MotionReveal delay={0.2}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center" style={{ color: 'var(--text-muted)' }}>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <path d="M14.167 14.167L17.5 17.5M15.833 9.167a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search demos by name, industry, or tag…"
              aria-label="Search demos"
              className="w-full rounded-2xl py-3 pl-11 pr-4 text-sm outline-none transition-colors"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            />
          </div>
        </MotionReveal>

        {/* Category filters */}
        <MotionReveal delay={0.24}>
          {/* Desktop: arrow-scrollable row */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              aria-label="Scroll categories left"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                <path d="M12.5 15L7.5 10l5-5" />
              </svg>
            </button>

            <div ref={categoryScrollRef} className="no-scrollbar overflow-x-auto">
              <div className="flex w-max items-center gap-2">
                {categories.map((cat) => {
                  const active = cat === selectedCategory;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all"
                      style={active
                        ? { background: 'rgba(46,209,237,0.15)', border: '1px solid rgba(46,209,237,0.5)', color: 'var(--accent-glow)' }
                        : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
                      }
                      aria-pressed={active}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollCategories('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
              aria-label="Scroll categories right"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                <path d="M7.5 5l5 5-5 5" />
              </svg>
            </button>
          </div>

          {/* Mobile: plain scroll */}
          <div className="md:hidden no-scrollbar -mx-1 overflow-x-auto px-1">
            <div className="flex w-max items-center gap-2 pb-1">
              {categories.map((cat) => {
                const active = cat === selectedCategory;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all"
                    style={active
                      ? { background: 'rgba(46,209,237,0.15)', border: '1px solid rgba(46,209,237,0.5)', color: 'var(--accent-glow)' }
                      : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
                    }
                    aria-pressed={active}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </MotionReveal>

        {/* Result count */}
        {!hasNoResults && (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing <strong style={{ color: 'var(--accent-glow)' }}>{filteredItems.length}</strong> of {items.length} demos
          </p>
        )}

        {/* Cards */}
        {hasNoResults ? (
          <MotionReveal delay={0.28}>
            <p className="pt-6 text-center text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              No demos found for &ldquo;{searchQuery.trim()}&rdquo;.
            </p>
          </MotionReveal>
        ) : (
          <>
            {/* Mobile: carousel when unfiltered, grid otherwise */}
            <div className="md:hidden pt-2">
              {isDefaultMobileCarousel ? (
                <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
                  <div className="flex snap-x snap-mandatory gap-4 pb-2">
                    {filteredItems.map((demo, i) => (
                      <div key={demo.path} className="w-[84%] shrink-0 snap-center">
                        <DemoCard demo={demo} delay={getWaveDelay(i)} showNewTag={recentPaths.has(demo.path)} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {filteredItems.map((demo, i) => (
                    <DemoCard key={demo.path} demo={demo} delay={getWaveDelay(i)} showNewTag={recentPaths.has(demo.path)} />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop grid */}
            <div className="hidden pt-2 grid-cols-1 gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((demo, i) => (
                <DemoCard key={demo.path} demo={demo} delay={getWaveDelay(i)} showNewTag={recentPaths.has(demo.path)} />
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
