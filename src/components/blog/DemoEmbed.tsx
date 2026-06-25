interface DemoEmbedProps {
  src: string;
  poster?: string;
  title?: string;
  href?: string;
}

export function DemoEmbed({ src, poster, title, href }: DemoEmbedProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)' }}>
      {title && (
        <div
          className="flex items-center gap-2 border-b px-4 py-2.5"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          {/* Faux browser dots */}
          <span className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} aria-hidden="true" />
          <span className="h-3 w-3 rounded-full" style={{ background: '#FEBC2E' }} aria-hidden="true" />
          <span className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} aria-hidden="true" />
          <span className="ml-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}>
            {title}
          </span>
        </div>
      )}
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="w-full"
        style={{ background: 'var(--surface)' }}
        aria-label={title ?? 'Demo video'}
      />
      {href && (
        <div className="px-4 py-3 text-right" style={{ background: 'var(--surface)' }}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: 'var(--accent)' }}
          >
            Open live demo →
          </a>
        </div>
      )}
    </div>
  );
}
