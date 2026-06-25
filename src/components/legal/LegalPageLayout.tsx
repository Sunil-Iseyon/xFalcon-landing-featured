'use client';

import { useEffect, useState } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

interface LegalSection {
  id: string;
  title: string;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactEmail: string;
  contactNo?: string;
  contactAddress: string;
  contactTitle?: string;
  trustBanner?: string;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  contactEmail,
}: LegalPageProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <div style={{ background: 'var(--bg)' }}>
        <LandingNavbar logoHref="/" />

        <main>
          <div
            className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
            style={{ paddingTop: '9rem', paddingBottom: '5rem' }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: 'var(--accent-glow)',
                marginBottom: '1.25rem',
              }}
            >
              LEGAL
            </p>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display, system-ui, sans-serif)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--text)',
                marginBottom: '0.875rem',
              }}
            >
              {title}
            </h1>

            {/* Date */}
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                marginBottom: '2.5rem',
              }}
            >
              Last updated: {formatDate(lastUpdated)}
            </p>

            {/* Rule */}
            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '2.5rem' }} />

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {sections.map((section) => (
                <div key={section.id} id={section.id} style={{ scrollMarginTop: '7rem' }}>
                  {section.title && (
                    <h2
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.35,
                      }}
                    >
                      {section.title}
                    </h2>
                  )}

                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.8,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {section.content}
                  </p>

                  {section.subsections && section.subsections.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        marginTop: '1.5rem',
                      }}
                    >
                      {section.subsections.map((sub, i) => (
                        <div
                          key={i}
                          style={{
                            paddingLeft: '1rem',
                            borderLeft: '2px solid var(--border)',
                          }}
                        >
                          <h3
                            style={{
                              fontSize: '0.9375rem',
                              fontWeight: 600,
                              color: 'var(--text)',
                              marginBottom: '0.4rem',
                            }}
                          >
                            {sub.title}
                          </h3>
                          <p
                            style={{
                              fontSize: '0.875rem',
                              lineHeight: 1.75,
                              color: 'var(--text-secondary)',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {sub.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact */}
            {contactEmail && (
              <>
                <div style={{ height: '1px', background: 'var(--border)', margin: '3rem 0 2rem' }} />
                <div id="contact" style={{ scrollMarginTop: '7rem' }}>
                  <h2
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Contact
                  </h2>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.8,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Questions about this policy? Email us at{' '}
                    <a
                      href={`mailto:${contactEmail}`}
                      style={{ color: 'var(--accent-glow)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      {contactEmail}
                    </a>
                    .
                  </p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Back to top — fixed, outside flow */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          background: 'var(--accent-glow)',
          color: '#061122',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '1rem',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          opacity: showButton ? 1 : 0,
          pointerEvents: showButton ? 'auto' : 'none',
          transform: showButton ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        ↑
      </button>
    </>
  );
}
