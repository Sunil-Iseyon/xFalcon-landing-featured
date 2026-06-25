'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  ctaText: string;
  features: string[];
}

interface PricingSectionProps {
  heading: string;
  items: PricingPlan[];
}

export function PricingSection({ heading, items }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center">
          <MotionReveal>
            <p className="inline-flex items-center rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369a1]">
              Pricing
            </p>
          </MotionReveal>
        </div>
        <MotionReveal delay={0.08}>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 text-center" style={{ letterSpacing: '-0.02em' }}>
            {heading}
          </h2>
        </MotionReveal>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((plan, index) => (
            <MotionReveal
              key={index}
              delay={index * 0.1}
              className={`group relative rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-linear-to-b from-[#2ED1ED] to-[#229CB1] text-white scale-105 md:scale-110 shadow-2xl'
                  : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-[#229CB1] rounded-full text-sm font-bold">
                  Popular
                </div>
              )}

              <div className="p-8 space-y-6 h-full flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={plan.popular ? 'text-red-100' : 'text-gray-600'}>
                    {plan.description}
                  </p>
                </div>

                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? 'text-red-100' : 'text-gray-600'}>{plan.period}</span>
                </div>

                <Link
                  href="/auth/sign-up"
                  className={`w-full py-3 rounded-full font-bold transition-all duration-300 text-center ${
                    plan.popular
                      ? 'bg-white text-[#229CB1] hover:bg-[#E6FBFF]'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.ctaText}
                </Link>

                <ul className="space-y-3 grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-3 items-start">
                      <Check size={20} className={plan.popular ? 'text-[#E6FBFF]' : 'text-[#2ED1ED]'} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
