import { MotionReveal } from '@/components/landing/MotionReveal';

interface WhySectionProps {
  points: { title: string; description: string }[];
}

export function WhySection({ points }: WhySectionProps) {
  return (
    <section id="why-xfalcon" className="px-4 py-12 md:py-16 lg:px-8 lg:py-20" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <MotionReveal>
            <p className="font-eyebrow" style={{ color: "var(--accent-glow)" }}>
              Why xFalcon
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <h2 className="font-display mt-4 text-3xl lg:text-4xl font-bold" style={{ color: "var(--text)" }}>Why xFalcon?</h2>
          </MotionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((p) => (
            <MotionReveal key={p.title} className="rounded-2xl p-6 shadow-sm" style={{ background: "var(--surface-raised)", border: "1px solid var(--border)" }}>
              <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{p.title}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySection;
