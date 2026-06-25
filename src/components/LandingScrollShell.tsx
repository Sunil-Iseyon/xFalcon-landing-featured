'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface LandingScrollShellProps {
  children: ReactNode;
}

type LocomotiveInstance = {
  destroy: () => void;
  resize: () => void;
};

export function LandingScrollShell({ children }: LandingScrollShellProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (shouldReduceMotion || !containerRef.current) {
      return;
    }

    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;
    if (isMobileViewport) {
      return;
    }

    let locomotiveScroll: LocomotiveInstance | undefined;
    let isDisposed = false;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const initializeScroll = async () => {
      const module = await import('locomotive-scroll');
      const LocomotiveScroll = module.default;

      if (isDisposed || !containerRef.current) {
        return;
      }

      locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.075,
          wheelMultiplier: 0.95,
        },
      }) as LocomotiveInstance;

      window.requestAnimationFrame(() => {
        locomotiveScroll?.resize();
        // Scroll to hash after Lenis is ready (handles page-load with hash)
        scrollToHash();
      });
    };

    initializeScroll();

    // Handle hash navigation while already on the page
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      isDisposed = true;
      locomotiveScroll?.destroy();
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [shouldReduceMotion]);

  return (
    <main ref={containerRef} data-scroll-container className="min-h-screen w-full overflow-x-clip">
      {children}
    </main>
  );
}