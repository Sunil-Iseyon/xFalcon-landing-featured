import Image from 'next/image';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function Figure({ src, alt, caption, width = 1200, height = 630 }: FigureProps) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-center text-sm"
          style={{ color: 'var(--text-muted)', fontFamily: 'ui-monospace, monospace' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
