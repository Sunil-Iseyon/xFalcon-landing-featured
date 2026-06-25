'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Spotlight } from '@/components/ui/spotlight';
import { MotionReveal } from '@/components/landing/MotionReveal';
import { LandingNavbar } from '@/components/landing/LandingNavbar';

interface SpotlightPreviewProps {
  eyebrow?: string;
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  rotatingWords?: string[];
}

function splitHeadingForAnimatedWord(heading: string) {
  const words = heading.trim().split(/\s+/);
  if (words.length < 2) {
    return { firstLine: heading, secondLinePrefix: '' };
  }

  if (words.length === 2) {
    return { firstLine: words[0], secondLinePrefix: '' };
  }

  return {
    firstLine: words.slice(0, -2).join(' '),
    secondLinePrefix: words[words.length - 2] ?? '',
  };
}

export default function SpotlightPreview({
  eyebrow,
  heading,
  subtitle,
  ctaText,
  ctaHref,
  rotatingWords: propRotatingWords,
}: SpotlightPreviewProps) {
  const rotatingWords = useMemo(() => propRotatingWords || ['Expert', 'Analyst', 'Advisor', 'Engine'], [propRotatingWords]);
  const maxWordLength = useMemo(
    () => rotatingWords.reduce((max, word) => Math.max(max, word.length), 0),
    [rotatingWords],
  );
  const { firstLine, secondLinePrefix } = splitHeadingForAnimatedWord(heading);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activeWord = rotatingWords[wordIndex] ?? rotatingWords[0];
  const animatedWord = activeWord.slice(0, charIndex);
  const animatedWordDisplay = animatedWord || activeWord.slice(0, 1);

  // Preserved for future reuse:
  // const scrollToNextSection = () => {
  //   const nextSectionIds = ['demos', 'overview', 'faq', 'contact'];
  //   const target = nextSectionIds
  //     .map((id) => document.getElementById(id))
  //     .find((section) => section instanceof HTMLElement);
  //
  //   if (target) {
  //     target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // };

  useEffect(() => {
    const isWordComplete = charIndex === activeWord.length;
    const isWordEmpty = charIndex === 0;

    let nextDelay = isDeleting ? 50 : 90;

    if (!isDeleting && isWordComplete) {
      nextDelay = 1100;
    } else if (isDeleting && isWordEmpty) {
      nextDelay = 220;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && !isWordComplete) {
        setCharIndex((prev) => prev + 1);
        return;
      }

      if (!isDeleting && isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isWordEmpty) {
        setCharIndex((prev) => prev - 1);
        return;
      }

      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, nextDelay);

    return () => window.clearTimeout(timeoutId);
  }, [activeWord.length, charIndex, isDeleting, rotatingWords.length]);

  return (
    <div data-scroll-section className="relative flex min-h-170 w-full overflow-hidden bg-[radial-gradient(1200px_500px_at_50%_20%,rgba(37,99,235,0.13),transparent_56%),radial-gradient(900px_420px_at_52%_22%,rgba(6,182,212,0.17),transparent_60%),linear-gradient(to_bottom,#EAF5FF_0%,#F3FAFF_42%,#ffffff_100%)] antialiased md:items-center md:justify-center">
      {/* Parallax background grid - commented out for future use */}
      <div
        // data-scroll
        // data-scroll-speed="-0.6"
        className={cn(
          'pointer-events-none absolute -inset-x-8 -inset-y-24 bg-size-[56px_56px] select-none',
          'bg-[linear-gradient(to_right,rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.06)_1px,transparent_1px)]',
        )}
      />
      <LandingNavbar />

      {/* Preserved for future reuse:
      <div data-scroll data-scroll-speed="-1.2" className="absolute inset-0 pointer-events-none">
        <Spotlight
          className="-top-56 -left-72 h-[120%] w-[116%] md:-top-42 md:-left-44 md:h-[108%] md:w-[104%]"
          fill="#A5D8FF"
        />
      </div>
      <div data-scroll data-scroll-speed="1" className="absolute inset-0 pointer-events-none">
        <Spotlight
          className="-top-56 -right-72 left-auto scale-x-[-1] h-[120%] w-[116%] md:-top-42 md:-right-44 md:h-[108%] md:w-[104%]"
          fill="#8BE8F7"
        />
      </div>
      */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center p-4 pt-44 text-center md:pt-24">
        {/* <MotionReveal>
          <p className="mx-auto mb-8 inline-flex items-center justify-center rounded-full border border-[#BAE6FD] bg-[#F0F9FF] px-5 py-2 text-center text-xs font-semibold tracking-[0.01em] text-[#0E7490] sm:px-6 sm:text-sm md:mb-10">
            {eyebrow || 'Answer Engine Optimization'}
          </p>
        </MotionReveal> */}
        <MotionReveal delay={0.08}>
          <h1 className="mx-auto max-w-[92vw] text-center text-[clamp(2.35rem,12vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#0B1220] sm:max-w-lg sm:text-6xl md:max-w-6xl md:text-8xl md:leading-[1.06] md:tracking-[-0.035em]">
            <span className="block">{firstLine}</span>
            <span className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 sm:flex-nowrap sm:gap-x-5">
              {secondLinePrefix ? <span className="inline-block leading-[1.14] pb-[0.08em] whitespace-normal sm:whitespace-nowrap">{secondLinePrefix}</span> : null}
              <span
                className="inline-flex min-w-[4.5ch] items-baseline justify-start align-middle pb-[0.08em] sm:min-w-[5.5ch]"
                style={{ width: undefined }}
              >
                <span className="bg-[linear-gradient(90deg,#06B6D4_0%,#2563EB_100%)] bg-clip-text leading-[1.14] text-left text-transparent">
                  {animatedWordDisplay}
                </span>
                <span className="ml-1 inline-block h-[0.9em] w-0.5 translate-y-[0.08em] bg-[#2563EB] align-middle animate-pulse" aria-hidden="true" />
              </span>
            </span>
          </h1>
        </MotionReveal>
        <MotionReveal delay={0.16}>
          <p className="mx-auto mt-2 max-w-88 text-center text-base font-normal leading-[1.45] whitespace-pre-line text-[#334155] sm:max-w-3xl md:max-w-4xl md:text-[1.08rem]">
            {subtitle}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.24} className="mt-4 flex justify-center">
          {/* Preserved for future reuse:
          <button
            type="button"
            onClick={scrollToNextSection}
            aria-label="Scroll to next section"
            className="group relative flex cursor-pointer flex-col items-center gap-1"
          >
            <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#21EDED]/50 bg-white/70 pt-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur transition-colors group-hover:border-[#0B1220]">
              <span className="h-1.5 w-1 rounded-full bg-[#21EDED] animate-[scrollDot_1.4s_ease-in-out_infinite]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-center -space-y-1.5 opacity-50 transition-opacity group-hover:opacity-90" aria-hidden="true">
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="animate-[fadeDown_1.4s_ease-in-out_infinite]"><path d="M1 1l6 6 6-6" stroke="#0B1220" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="animate-[fadeDown_1.4s_ease-in-out_infinite_0.2s]"><path d="M1 1l6 6 6-6" stroke="#0B1220" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/></svg>
            </span>
          </button>
          */}
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#06B6D4] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(37,99,235,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc] focus-visible:ring-offset-2"
          >
            {ctaText}
          </a>
        </MotionReveal>
      </div>
    </div>
  );
}
