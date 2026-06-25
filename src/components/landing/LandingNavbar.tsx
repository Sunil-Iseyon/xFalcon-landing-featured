'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/landing/ThemeToggle';

interface LandingNavbarProps {
  sectionBasePath?: string;
  logoHref?: string;
}

export function LandingNavbar({ sectionBasePath = '', logoHref }: LandingNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpen]);

  // Close mobile menu on route change (ESC key)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const hash = href.slice(hashIndex);
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', hash);
  };

  const logoContent = (
    <>
      {/* Mark swaps between light and dark variants via CSS utility classes added in globals.css */}
      {/* unoptimized bypasses Next.js image cache so file replacements reflect immediately */}
      <Image
        src="/brand/logo/mark_darkcyan_on_light_1024.png"
        alt="xFalcon falcon mark"
        width={45}
        height={32}
        className="logo-light-only h-8 w-auto object-contain"
        priority
        unoptimized
      />
      <Image
        src="/brand/logo/mark_white_on_dark_1024.png"
        alt="xFalcon falcon mark"
        width={45}
        height={32}
        className="logo-dark-only h-8 w-auto object-contain"
        priority
        unoptimized
      />
      <span
        className="text-lg font-semibold tracking-tight"
        style={{ color: 'var(--text)', fontFamily: 'var(--font-buenard)' }}
      >
        <span style={{ color: 'var(--accent-glow)' }}>x</span>Falcon
      </span>
    </>
  );

  const navLinks = [
    { label: 'How it works', href: `${sectionBasePath}/#how-it-works` },
    { label: 'Blog',         href: '/blog' },
    { label: 'Demos',        href: '/demos' },
  ];

  return (
    <div ref={wrapperRef} className="fixed left-1/2 top-7 z-50 w-[92%] max-w-7xl -translate-x-1/2">
      {/* ── Pill nav bar ── */}
      <nav
        className="flex items-center justify-between rounded-full px-6 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.10)] backdrop-blur-md"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo lockup */}
        {logoHref ? (
          <Link href={logoHref} className="flex items-center gap-3" aria-label="xFalcon home">
            {logoContent}
          </Link>
        ) : (
          <button type="button" onClick={scrollToTop} className="flex items-center gap-3" aria-label="Scroll to top">
            {logoContent}
          </button>
        )}

        {/* Desktop nav links */}
        <div
          className="hidden items-center gap-6 text-sm font-semibold md:flex"
          style={{ color: 'var(--text-secondary)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-xf-cyan"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* CTA — desktop only */}
          <Link
            href="mailto:info@iseyon.com?subject=Book%20a%20Demo"
            className="hidden md:inline-flex rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xf-cyan focus-visible:ring-offset-2"
            style={{ background: 'var(--accent-glow)', color: '#061122' }}
          >
            Book a demo →
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{
              background: menuOpen ? 'rgba(46,209,237,0.12)' : 'var(--surface-raised, var(--surface))',
              border: '1px solid var(--border)',
            }}
          >
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ color: 'var(--accent-glow)' }}>
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ color: 'var(--text)' }}>
                <line x1="2" y1="4.5" x2="14" y2="4.5" />
                <line x1="2" y1="8"   x2="14" y2="8"   />
                <line x1="2" y1="11.5" x2="14" y2="11.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl px-3 py-3 shadow-[0_12px_40px_rgba(15,23,42,0.18)] backdrop-blur-md"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Nav links */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => { handleNavClick(e, link.href); setMenuOpen(false); }}
                className="rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:text-xf-cyan"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0.25rem' }} />

          {/* CTA */}
          <Link
            href="mailto:info@iseyon.com?subject=Book%20a%20Demo"
            onClick={() => setMenuOpen(false)}
            className="block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'var(--accent-glow)', color: '#061122' }}
          >
            Book a demo →
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingNavbar;
