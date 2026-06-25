'use client';

import { LandingNavbar } from '@/components/landing/LandingNavbar';

/* Cyan square bullet used for list items */
function CyanBullet() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
      style={{ background: 'var(--accent-glow)' }}
    />
  );
}

/* One feature column */
function FeatureCard({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl p-5 sm:p-6"
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Column label */}
      <div>
        <span
          className="font-eyebrow text-xs"
          style={{ color: 'var(--accent-glow)', letterSpacing: '0.18em' }}
        >
          {label}
        </span>
        <div
          className="mt-2 h-px w-full"
          style={{ background: 'var(--border)' }}
          aria-hidden="true"
        />
      </div>
      {/* Items */}
      <ul className="flex flex-col gap-3" role="list">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: 'var(--text)' }}>
            <CyanBullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Stat pill */
function StatPill({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
      style={{
        border: '1px solid var(--accent-glow)',
        color: 'var(--text)',
        background: 'transparent',
      }}
    >
      {text}
    </span>
  );
}

interface HeroSectionProps {
  eyebrow?: string;
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  rotatingWords?: string[];
  previewImageSrc?: string;
}

export function HeroSection(_props: HeroSectionProps) {
  return (
    <div
      data-scroll-section
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle radial background glow — visible especially in dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 600px at 10% 15%, rgba(46,209,237,0.05) 0%, transparent 65%), radial-gradient(700px 500px at 90% 85%, rgba(46,209,237,0.04) 0%, transparent 60%)',
        }}
      />

      <LandingNavbar />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8 lg:pt-44">

        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-sm"
            style={{ background: 'var(--accent-glow)' }}
          />
          <p className="font-eyebrow" style={{ color: 'var(--accent-glow)' }}>
            xFALCON · AI BUSINESS INTELLIGENCE
          </p>
        </div>

        {/* Cyan accent bar */}
        <div
          className="mb-6 h-0.5 w-16 rounded-full"
          style={{ background: 'var(--accent-glow)' }}
          aria-hidden="true"
        />

        {/* Headline — semantic h1 */}
        <h1
          className="font-display mb-4 max-w-4xl leading-[1.08] tracking-[-0.01em]"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 700,
            color: 'var(--text)',
          }}
        >
          The operating system for enterprise intelligence
        </h1>

        {/* Subhead */}
        <p
          className="mb-8 max-w-2xl text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          The hard parts of analytics, solved in days, not months.
        </p>

        {/* CTAs */}
        <div className="mb-14 flex flex-wrap items-center gap-4">
          <a
            href="mailto:info@iseyon.com?subject=Book%20a%20Demo"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold shadow-md transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
            style={{ background: 'var(--accent-glow)', color: '#061122' }}
          >
            Book a demo →
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              background: 'transparent',
            }}
          >
            See how it works
          </a>
        </div>

        {/* TRUST / INSIGHT / DELIVER three-column grid */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            label="TRUST"
            items={[
              'Data models & data-quality QA',
              'Governed, branded portal',
              'Secure architecture on AWS',
            ]}
          />
          <FeatureCard
            label="INSIGHT"
            items={[
              'Autonomous analysis',
              'Interactive query, plain English',
              'Self-validating results',
            ]}
          />
          <FeatureCard
            label="DELIVER"
            items={[
              'Daily briefings - xFalcon News',
              'Auto-written QBR decks',
              'Board-ready Excel workbooks',
            ]}
          />
        </div>

        {/* Stat pills */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <StatPill text="75–93% lower TCO" />
          <StatPill text="Live in 4–6 weeks" />
          <StatPill text="Zero data migration" />
        </div>

        {/* Footer line */}
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Three learning systems: Memory · Annotations · Self-Correction · MCP-native architecture (first-mover)
        </p>
      </div>
    </div>
  );
}
