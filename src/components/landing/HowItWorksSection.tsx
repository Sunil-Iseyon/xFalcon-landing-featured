'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Scene data ──────────────────────────────────────────── */
const SCENES = [
  {
    num: '01',
    headline: 'Connect your data',
    body: 'Point xFalcon at your warehouse — Snowflake, Databricks, BigQuery. It maps your tables and relationships automatically.',
    tag: 'No pipelines to build',
    url: 'xfalcon.ai · connecting warehouse',
  },
  {
    num: '02',
    headline: 'It already knows your industry',
    body: "xFalcon arrives pre-trained on your industry's metrics, definitions, and guardrails — so it interprets your data, it doesn't just read it.",
    tag: 'Domain expertise built in',
    url: 'xfalcon.ai · domain intelligence',
  },
  {
    num: '03',
    headline: 'Ask in plain English',
    body: "Ask the question you'd ask a senior analyst. xFalcon picks the right tables, applies the right logic, and shows its work.",
    tag: 'No SQL required',
    url: 'xfalcon.ai · natural language query',
  },
  {
    num: '04',
    headline: 'Decisions, not just charts',
    body: 'You get the answer and the "so what" — the recommendation, the risk, and what to do next.',
    tag: 'The insight, not the homework',
    url: 'xfalcon.ai · decision card',
  },
] as const;

/* ── Viz components ──────────────────────────────────────── */

function Viz0() {
  return (
    <div className="flex w-full flex-col gap-4">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--accent-glow)', fontFamily: 'ui-monospace, monospace' }}
      >
        Auto-discovering schema
      </p>
      <div className="flex flex-col gap-2.5">
        {[
          { label: 'orders',    cols: '18 cols' },
          { label: 'customers', cols: '12 cols' },
          { label: 'products',  cols: '9 cols'  },
          { label: 'inventory', cols: '7 cols'  },
        ].map((node) => (
          <div key={node.label} className="flex items-center gap-3">
            <div
              className="flex h-8 min-w-[88px] items-center justify-center rounded-lg px-3 text-xs font-bold"
              style={{
                background: 'rgba(46,209,237,0.10)',
                border: '1px solid rgba(46,209,237,0.30)',
                color: 'var(--accent-glow)',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              {node.label}
            </div>
            {/* animated dashed connector — disabled when prefers-reduced-motion */}
            <div className="how-dashed-line flex-1" />
            <span
              className="tabular-nums text-xs"
              style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}
            >
              {node.cols}
            </span>
          </div>
        ))}
        <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
          ✓ 38 tables · 412 columns discovered
        </p>
      </div>
    </div>
  );
}

function Viz1() {
  return (
    <div className="flex w-full flex-col gap-2.5" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '13px' }}>
      {[
        { text: 'Industry context loaded',                   color: 'var(--text)',      bold: true  },
        { text: '▸ Fiscal calendar: 4-4-5 detected',        color: 'var(--accent-glow)', bold: false },
        { text: '▸ Retail KPI definitions: 47 loaded',      color: 'var(--accent-glow)', bold: false },
        { text: '▸ Guardrail: week-over-week vs LY',        color: 'var(--color-viz-positive)',   bold: false },
        { text: '▸ Guardrail: margin % floor = 18%',        color: 'var(--color-viz-positive)',   bold: false },
        { text: '⚠  Region "EMEA" undefined — flagged',    color: 'var(--color-xf-warn-inline)', bold: false },
      ].map((line, i) => (
        <p key={i} className={line.bold ? 'font-semibold' : ''} style={{ color: line.color }}>
          {line.text}
        </p>
      ))}
      <div
        className="mt-2 self-start rounded-lg px-3 py-1.5 text-xs font-semibold"
        style={{ background: 'var(--color-viz-positive-bg)', border: '1px solid var(--color-viz-positive-border)', color: 'var(--color-viz-positive)' }}
      >
        ✓ Domain intelligence active
      </div>
    </div>
  );
}

function Viz2() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--viz-query-bg)', border: '1px solid var(--viz-query-border)' }}
      >
        <div
          className="mb-3 flex items-center gap-2 rounded-lg px-2 py-1"
          style={{ background: 'var(--viz-query-header)' }}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: 'var(--accent-glow)', boxShadow: '0 0 8px var(--accent-glow)' }}
          />
          <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
            xFalcon · natural language query
          </span>
        </div>
        <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--text)' }}>
          Which regions are underperforming vs last year?
        </p>
        <div className="flex flex-col gap-1.5" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px' }}>
          <p style={{ color: 'var(--accent-glow)' }}>▸ Pulling tables: sales_summary, regions</p>
          <p style={{ color: 'var(--accent-glow)' }}>▸ Applying 364-day LY comparison…</p>
          <p style={{ color: 'var(--color-viz-positive)' }}>✓ Query built · 3 underperforming regions found</p>
        </div>
        <div className="mt-2.5 flex items-center gap-1">
          {[0, 150, 300].map((delay) => (
            <div
              key={delay}
              className="h-1 w-1 animate-bounce rounded-full"
              style={{ background: 'var(--accent-glow)', animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Viz3() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Bar chart */}
      <div
        className="flex items-end gap-1 rounded-xl p-3"
        style={{ background: 'rgba(46,209,237,0.04)', border: '1px solid var(--border)' }}
      >
        {[45, 62, 38, 71, 55, 80, 68, 90, 74, 88, 76, 95].map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center">
            <div
              className="w-full rounded-t-sm"
              style={{
                height: `${h * 0.55}px`,
                background: i === 11 ? 'var(--accent-glow)' : 'rgba(46,209,237,0.22)',
                boxShadow: i === 11 ? '0 0 8px rgba(46,209,237,0.5)' : 'none',
              }}
            />
          </div>
        ))}
      </div>
      {/* SO WHAT */}
      <div
        className="rounded-xl p-3.5"
        style={{ background: 'rgba(46,209,237,0.07)', border: '1px solid rgba(46,209,237,0.25)' }}
      >
        <p
          className="mb-1.5 text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--accent-glow)', fontFamily: 'ui-monospace, monospace' }}
        >
          SO WHAT
        </p>
        <p className="text-sm leading-snug" style={{ color: 'var(--text)' }}>
          EMEA is down 18% vs LY — driven by UK and DE. Recommend reviewing promo cadence before Q3 planning.
        </p>
      </div>
    </div>
  );
}

const VIZZES = [Viz0, Viz1, Viz2, Viz3] as const;

/* ── Globe icon for URL chip ─────────────────────────────── */
function GlobeIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 8c0-1.38.57-2.63 1.5-3.54M10.5 8c0 1.38-.57 2.63-1.5 3.54M2 8h12M8 2.5C6.5 4 5.5 5.9 5.5 8s1 4 2.5 5.5"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export function HowItWorksSection() {
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const urlRef    = useRef<HTMLSpanElement | null>(null);
  const [active,  setActive]  = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setReduced(true); return; }

    let current = 0;

    const activate = (i: number) => {
      if (i === current && i !== 0) return;
      current = i;
      setActive(i);
      const el = urlRef.current;
      if (!el) return;
      el.style.opacity = '0';
      setTimeout(() => {
        if (!urlRef.current) return;
        urlRef.current.textContent = SCENES[i].url;
        urlRef.current.style.opacity = '1';
      }, 150);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            activate(Number((e.target as HTMLElement).dataset.scene));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sceneRefs.current.forEach((s) => s && io.observe(s));
    // Activate scene 0 immediately so the panel shows on first paint
    activate(0);

    return () => io.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 pt-14 pb-0 md:pt-16"
      style={{ background: 'var(--bg)' }}
      aria-label="How xFalcon works"
    >
      {/* Header */}
      <div className="mx-auto mb-8 max-w-2xl px-4 text-center">
        <p className="font-eyebrow mb-3" style={{ color: 'var(--accent-glow)' }}>
          HOW IT WORKS
        </p>
        <h2
          className="font-display leading-tight"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}
        >
          From warehouse to decisions in days
        </h2>
      </div>

      {/* Scrollytelling grid */}
      <div className="scrolly-section">

        {/* ── Left: text scenes ── */}
        <div className="scrolly-scenes">
          {SCENES.map((scene, i) => {
            const Viz = VIZZES[i];
            return (
              <div
                key={i}
                ref={(el) => { sceneRefs.current[i] = el; }}
                data-scene={i}
                className={`scrolly-scene${(reduced || active === i) ? ' active' : ''}`}
              >
                <p
                  className="font-eyebrow"
                  style={{ color: 'var(--accent-glow)' }}
                >
                  {scene.num}
                </p>
                <h3
                  className="font-display leading-snug"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {scene.headline}
                </h3>
                <p className="max-w-[42ch] text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {scene.body}
                </p>
                <span className="how-tag">{scene.tag}</span>

                {/* Mobile: viz inline below scene text */}
                <div className="scrolly-mobile-viz">
                  <Viz />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Right: sticky panel ── */}
        <div className="scrolly-stickywrap">
          <div className="scrolly-sticky">
            <div className="scrolly-panel" role="img" aria-label={`Step ${active + 1} visual: ${SCENES[active].headline}`}>

              {/* Browser bar */}
              <div className="scrolly-browserbar" aria-hidden="true">
                <span className="how-mac-dot" style={{ background: '#FF5F57' }} />
                <span className="how-mac-dot" style={{ background: '#FEBC2E' }} />
                <span className="how-mac-dot" style={{ background: '#28C840' }} />
                <span className="how-url-chip">
                  <GlobeIcon />
                  <span
                    ref={urlRef}
                    style={{ transition: 'opacity 0.15s ease' }}
                  >
                    {SCENES[0].url}
                  </span>
                </span>
              </div>

              {/* Crossfading viz layers */}
              {VIZZES.map((Viz, i) => (
                <div
                  key={i}
                  className={`scrolly-viz${
                    reduced
                      ? i === VIZZES.length - 1 ? ' active' : ''
                      : active === i ? ' active' : ''
                  }`}
                  aria-hidden={reduced ? i !== VIZZES.length - 1 : active !== i}
                >
                  <Viz />
                </div>
              ))}

              {/* Progress dots */}
              <div className="scrolly-dots" role="tablist" aria-label="Step progress">
                {SCENES.map((s, i) => (
                  <button
                    key={i}
                    className={`scrolly-dot${active === i ? ' on' : ''}`}
                    role="tab"
                    aria-label={`Step ${i + 1}: ${s.headline}`}
                    aria-selected={active === i}
                    onClick={() =>
                      sceneRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;
