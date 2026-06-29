import { Users, Zap, Sliders, Activity, Smile, Shield } from 'lucide-react';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  heading: string;
  description?: string;
  items: Feature[];
}

const ICON_MAP = {
  users: Users,
  zap: Zap,
  sliders: Sliders,
  activity: Activity,
  smile: Smile,
  shield: Shield,
};

export function FeaturesSection({
  heading,
  description,
  items,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <MotionReveal>
            <p className="inline-flex items-center rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369a1]">
              Features
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] lg:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              {heading}
            </h2>
          </MotionReveal>
          {description && (
            <MotionReveal delay={0.16}>
              <p className="text-lg leading-relaxed text-[#42526B]">
                {description}
              </p>
            </MotionReveal>
          )}
        </div>

        {/* 3x2 Bento Grid - Features with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.icon as keyof typeof ICON_MAP] ?? Shield;
            return (
              <MotionReveal
                key={index}
                delay={index * 0.08}
                className="group space-y-4 rounded-3xl bg-white/70 p-8 backdrop-blur-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
              >
                <div className="inline-block rounded-lg bg-[#EAF7FF] p-3 transition-colors group-hover:bg-[#DBF4FF]">
                  <IconComponent
                    size={24}
                    className="text-[#0EA5C6]"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0B1220]">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-[#42526B]">
                  {feature.description}
                </p>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
