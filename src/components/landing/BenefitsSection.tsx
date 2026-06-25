import { CheckCircle } from 'lucide-react';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface Benefit {
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  heading: string;
  subheading: string;
  items: Benefit[];
}

export function BenefitsSection({
  heading,
  subheading,
  items,
}: BenefitsSectionProps) {
  return (
    <section id="benefits" className="py-20 lg:py-32 px-4 md:px-8 lg:px-12 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <MotionReveal>
            <p className="inline-flex items-center rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369a1]">
              Benefits
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B1220]" style={{ letterSpacing: '-0.02em' }}>
              {heading}
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.16}>
            <p className="text-lg text-[#42526B] leading-relaxed">
              {subheading}
            </p>
          </MotionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((benefit, index) => (
            <MotionReveal
              key={index}
              delay={index * 0.08}
              className="group relative overflow-hidden rounded-3xl border border-[#D7DEE8] bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#2ED1ED] hover:shadow-[0_16px_40px_rgba(6,17,34,0.10)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#2ED1ED] to-[#229CB1]" />
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAFBFE] border border-[#CBEFF7]">
                <CheckCircle size={22} className="text-[#229CB1]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0B1220]">
                  {benefit.title}
                </h3>
                <p className="text-[#42526B] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
