'use client';

import { Users, Upload, Settings, CheckCircle } from 'lucide-react';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface Step {
  step: string;
  title: string;
  description: string;
  icon: 'user-plus' | 'upload' | 'settings' | 'check-circle';
}

interface StepsSectionProps {
  heading: string;
  items: Step[];
}

const ICON_MAP = {
  'user-plus': Users,
  upload: Upload,
  settings: Settings,
  'check-circle': CheckCircle,
};

export function StepsSection({ heading, items }: StepsSectionProps) {
  return (
    <section id="steps" className="py-20 lg:py-32 px-4 md:px-8 lg:px-12 bg-[#F5F8FC]">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <MotionReveal>
            <p className="inline-flex items-center rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369a1]">
              Steps
            </p>
          </MotionReveal>
        </div>
        <MotionReveal delay={0.08}>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0B1220] text-center" style={{ letterSpacing: '-0.02em' }}>
            {heading}
          </h2>
        </MotionReveal>

        {/* Steps */}
        <div className="space-y-8">
          {items.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <MotionReveal
                key={index}
                delay={index * 0.1}
                className="group flex gap-8 p-8 rounded-2xl bg-background border border-[#D7DEE8] hover:border-[#2ED1ED] transition-all duration-300 hover:shadow-[0_14px_32px_rgba(6,17,34,0.10)]"
              >
                {/* Step number and icon */}
                <div className="shrink-0 flex flex-col items-center gap-4">
                  <span className="text-2xl font-black text-[#229CB1]">{item.step}</span>
                  <div className="p-3 bg-[#EAFBFE] border border-[#CBEFF7] rounded-lg group-hover:bg-[#DDFBFF] transition-colors">
                    <IconComponent size={24} className="text-[#229CB1]" />
                  </div>
                </div>

                {/* Content */}
                <div className="grow space-y-2">
                    <h3 className="text-xl font-bold text-[#0B1220]">{item.title}</h3>
                    <p className="text-[#42526B] leading-relaxed">{item.description}</p>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
