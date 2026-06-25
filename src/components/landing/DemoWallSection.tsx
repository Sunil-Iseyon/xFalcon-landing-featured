'use client';

import Link from 'next/link';
import type { DemoEntry } from '@/lib/content';

interface DemoWallSectionProps {
  items: DemoEntry[];
  total: number;
}

export function DemoWallSection({ items, total }: DemoWallSectionProps) {
  const wall = items.slice(0, 8);
  const featured = wall[0];

  return (
    <section
      id="demo-wall"
      className="scroll-mt-28"
      style={{ background: 'var(--bg)', paddingTop: '5rem', paddingBottom: '5.5rem' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="font-eyebrow mb-3" style={{ color: 'var(--accent-glow)' }}>
            One prompt. Any dashboard.
          </p>
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            color: 'var(--text)',
          }}>
            {featured?.title ?? 'Falcon Finance'} is one of{' '}
            {/* <span style={{
              background: 'linear-gradient(90deg, #2ED1ED 0%, #7af0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}> */}
              thirty-plus.
            {/* </span> */}
          </h2>
        </div>

        {/* Demo wall grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20" style={{ marginBottom: '2.75rem' }}>
          {wall.map((demo, i) => (
            <a
              key={demo.path}
              href={demo.path}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ED1ED] focus-visible:ring-offset-2"
              style={i === 0 ? {
                background: 'rgba(46,209,237,0.09)',
                border: '1px solid rgba(46,209,237,0.60)',
                boxShadow: '0 0 28px rgba(46,209,237,0.16)',
                textDecoration: 'none',
              } : {
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              <p
                className="font-semibold leading-snug"
                style={{ fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.3rem' }}
              >
                {demo.title}
              </p>
              <p style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                fontFamily: 'ui-monospace, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: i === 0 ? 'var(--accent-glow)' : 'var(--text-muted)',
              }}>
                {demo.category}
              </p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <p style={{
          textAlign: 'center',
          fontSize: '1.0625rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
        }}>
          …and {Math.max(0, total - wall.length)} more at{' '}
          <Link
            href="/demos"
            style={{
              color: 'var(--accent-glow)',
              fontFamily: 'ui-monospace, monospace',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            xFalcon.ai/demos →
          </Link>
        </p>

      </div>
    </section>
  );
}

export default DemoWallSection;
