'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, Twitter } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterSectionProps {
  logoSrc?: string;
  logoAlt?: string;
  companyName: string;
  companyDescription: string;
  tagline: string;
  sections: FooterSection[];
  contactInfo?: {
    email: string;
    phoneDisplay?: string;
    phoneLink?: string;
    whatsappDisplay?: string;
    whatsappLink?: string;
    twitterLink: string;
    instagramLink: string;
  };
  socialLinks?: {
    label: string;
    href: string;
  }[];
  copyright: string;
}

export function FooterSection({
  logoSrc: _logoSrc,
  logoAlt: _logoAlt,
  companyName: _companyName,
  companyDescription,
  tagline: _tagline,
  sections,
  contactInfo,
  socialLinks,
  copyright,
}: FooterSectionProps) {
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    const hash = href.slice(hashIndex);
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', hash);
  };

  const getSocialIcon = (label: string) => {
    const key = label.trim().toLowerCase();

    if (key.includes('twitter') || key.includes('x')) {
      return <Twitter className="h-4 w-4" aria-hidden="true" />;
    }

    if (key.includes('insta')) {
      return <Instagram className="h-4 w-4" aria-hidden="true" />;
    }

    if (key.includes('phone') || key.includes('call') || key.includes('whats')) {
      return <Phone className="h-4 w-4" aria-hidden="true" />;
    }

    if (key.includes('mail') || key.includes('email')) {
      return <Mail className="h-4 w-4" aria-hidden="true" />;
    }

    return <span className="text-[11px] font-semibold uppercase">{label.slice(0, 2)}</span>;
  };

  const sectionsWithoutContact = sections.filter((section) => {
    const title = section.title.trim().toLowerCase();
    return title !== 'contact' && title !== 'mvp scope';
  });

  const navbarSyncedNavigateLinks: FooterLink[] = [
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Demos', href: '/demos' },
  ];

  const sectionsWithSyncedNavigate = sectionsWithoutContact.map((section) =>
    section.title.trim().toLowerCase() === 'navigate'
      ? { ...section, links: navbarSyncedNavigateLinks }
      : section,
  );

  const normalizedContactEmail = contactInfo?.email
    .replace(/^mailto:/i, '')
    .split('?')[0]
    .trim();

  const contactPhoneDisplay = contactInfo?.phoneDisplay ?? contactInfo?.whatsappDisplay;
  const normalizedContactPhoneDisplay = contactPhoneDisplay?.trim();

  const normalizedContactPhoneLink = contactInfo?.phoneLink?.trim();
  const fallbackPhoneLink = normalizedContactPhoneDisplay
    ? `tel:${normalizedContactPhoneDisplay.replace(/[^\d+]/g, '')}`
    : undefined;

  const resolvedContactPhoneLink = normalizedContactPhoneLink || fallbackPhoneLink || contactInfo?.whatsappLink;

  const resolvedSections = contactInfo && normalizedContactEmail
    ? [
        ...sectionsWithSyncedNavigate,
        {
          title: 'Contact',
          links: [
            {
              label: `Email: ${normalizedContactEmail}`,
              href: `mailto:${normalizedContactEmail}`,
            },
            {
              label: `Contact No: ${normalizedContactPhoneDisplay ?? ''}`,
              href: resolvedContactPhoneLink ?? '#contact',
            },
          ],
        },
      ]
    : sectionsWithSyncedNavigate;

  const resolvedSocialLinks = contactInfo && normalizedContactEmail
    ? [
        // { label: 'Twitter', href: contactInfo.twitterLink },
        // { label: 'Instagram', href: contactInfo.instagramLink },
        // { label: 'WhatsApp', href: contactInfo.whatsappLink },
        { label: 'Mail', href: `mailto:${normalizedContactEmail}` },
      ]
    : socialLinks;

  return (
    <footer data-scroll-section className="bg-xf-navy border-t border-xf-border">
      <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-12 border-b border-xf-border">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                {/* Footer mark swaps with theme; unoptimized bypasses Next.js image cache */}
                <Image
                  src="/brand/logo/mark_darkcyan_on_light_1024.png"
                  alt="xFalcon mark"
                  width={50}
                  height={36}
                  className="logo-light-only h-9 w-auto object-contain"
                  unoptimized
                />
                <Image
                  src="/brand/logo/mark_white_on_dark_1024.png"
                  alt="xFalcon mark"
                  width={50}
                  height={36}
                  className="logo-dark-only h-9 w-auto object-contain"
                  unoptimized
                />
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-buenard)' }}
                >
                  <span style={{ color: 'var(--color-xf-cyan, #2ED1ED)' }}>x</span>
                  <span style={{ color: 'var(--color-xf-text-on-dark, #EAF2FF)' }}>Falcon</span>
                </span>
              </div>
              <p style={{ color: 'var(--color-xf-text-secondary, #B8C0CC)', lineHeight: '1.625' }}>
                {companyDescription}
              </p>
            </div>

            {/* Footer sections */}
            {resolvedSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-xf-text-on-dark">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {(() => {
                    const isContactSection = section.title.trim().toLowerCase() === 'contact';

                    return section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {isContactSection ? (
                          <span className="text-xf-text-secondary">
                            {link.label}
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-xf-text-secondary hover:text-xf-cyan transition-colors duration-200"
                            onClick={(e) => handleHashClick(e, link.href)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-xf-text-muted text-sm">
              {copyright}
            </p>

            {/* Social links */}
            {resolvedSocialLinks && resolvedSocialLinks.length > 0 && (
              <div className="flex gap-3">
                {resolvedSocialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-xf-border text-xf-text-secondary transition-colors duration-200 hover:border-xf-cyan hover:text-xf-cyan"
                    aria-label={link.label}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {getSocialIcon(link.label)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
