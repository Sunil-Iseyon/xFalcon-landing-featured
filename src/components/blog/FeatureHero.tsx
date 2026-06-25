import Image from 'next/image';

interface FeatureHeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function FeatureHero({ eyebrow, heading, subheading, imageSrc, imageAlt }: FeatureHeroProps) {
  return (
    <div
      className="my-8 overflow-hidden rounded-2xl px-8 py-10"
      style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}
    >
      {eyebrow && (
        <p className="font-eyebrow mb-3" style={{ color: 'var(--accent-glow)' }}>
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-2xl font-bold leading-tight tracking-tight lg:text-3xl"
        style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
      >
        {heading}
      </h2>
      {subheading && (
        <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {subheading}
        </p>
      )}
      {imageSrc && (
        <div className="relative mt-6 overflow-hidden rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <Image
            src={imageSrc}
            alt={imageAlt ?? heading}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
