import type { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'note';
  title?: string;
  children: ReactNode;
}

const STYLES = {
  info:    { border: 'rgba(46,209,237,0.4)',  bg: 'rgba(46,209,237,0.06)',  icon: 'ℹ', label: 'Info' },
  tip:     { border: 'rgba(139,224,184,0.4)', bg: 'rgba(139,224,184,0.06)', icon: '✦', label: 'Tip' },
  warning: { border: 'rgba(226,104,90,0.4)',  bg: 'rgba(226,104,90,0.06)',  icon: '⚠', label: 'Warning' },
  note:    { border: 'var(--border)',          bg: 'var(--surface)',         icon: '◈', label: 'Note' },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = STYLES[type];
  return (
    <aside
      className="my-6 rounded-xl px-5 py-4"
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
    >
      <p
        className="mb-2 text-xs font-bold uppercase tracking-widest"
        style={{ color: 'var(--accent-glow)', fontFamily: 'ui-monospace, monospace' }}
      >
        {s.icon} {title ?? s.label}
      </p>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </aside>
  );
}
