import Image from 'next/image';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface CTASectionProps {
  heading: string;
  description: string;
  contactEmail?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function CTASection({ heading, description, contactEmail, primaryCTA, secondaryCTA }: CTASectionProps) {
  const contactButtonLabel = primaryCTA?.text?.trim() || 'Book a Demo';
  const subject = encodeURIComponent('xFalcon access request');
  const body = encodeURIComponent(
    'Hi xFalcon team,\n\nI would like to book a demo.\n\nMy name is:\nMy email is:\nCompany:\nUse case:\n',
  );
  const normalizedEmail = contactEmail?.replace(/^mailto:/i, '').split('?')[0].trim();
  const contactHref = normalizedEmail
    ? `mailto:${normalizedEmail}?subject=${subject}&body=${body}`
    : '#contact';

  return (
    <section
      id="contact"
      data-scroll-section
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32"
      style={{ background: 'var(--bg)' }}
    >
      {/* Radial glow — reads in both themes via accent-glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1000px 500px at 50% 20%, rgba(46,209,237,0.06) 0%, transparent 60%), radial-gradient(700px 400px at 52% 22%, rgba(46,209,237,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
        {/* Logo circle */}
        <MotionReveal className="flex justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: 'rgba(46,209,237,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <Image src="/favicon_32.png" alt="xFalcon logo" width={28} height={28} className="h-7 w-7" />
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <p
            className="font-eyebrow"
            style={{ color: 'var(--accent-glow)' }}
          >
            CONTACT US
          </p>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <h2
            className="font-display text-4xl font-bold lg:text-5xl"
            style={{ letterSpacing: '-0.02em', color: 'var(--text)' }}
          >
            {heading}
          </h2>
        </MotionReveal>

        <MotionReveal delay={0.24}>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.3}>
          <div className="flex items-center justify-center gap-4">
            <a
              href={contactHref}
              target={contactHref.startsWith('http') ? '_blank' : undefined}
              rel={contactHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
              style={{ background: 'var(--accent-glow)', color: '#061122' }}
            >
              {contactButtonLabel}
            </a>
            {secondaryCTA ? (
              <a
                href={secondaryCTA.href}
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-glow focus-visible:ring-offset-2"
                style={{ border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--surface)' }}
              >
                {secondaryCTA.text}
              </a>
            ) : null}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
