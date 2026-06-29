'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { MotionReveal } from '@/components/landing/MotionReveal';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  heading: string;
  items: FAQItem[];
}

export function FAQSection({ heading, items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <MotionReveal>
            <p className="inline-flex items-center rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369a1]">
              FAQ
            </p>
          </MotionReveal>
        </div>
        <MotionReveal delay={0.08}>
          <h2 className="text-center text-3xl sm:text-4xl font-black text-[#0B1220] lg:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            {heading}
          </h2>
        </MotionReveal>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <MotionReveal
              key={index}
              delay={index * 0.08}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-colors hover:shadow-[0_14px_28px_rgba(15,23,42,0.10)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between bg-white px-4 py-4 sm:px-6 sm:py-6 transition-colors hover:bg-[#F6FBFF]"
              >
                <h3 className="text-left text-lg font-semibold text-[#0B1220]">{item.question}</h3>
                <div className="shrink-0 ml-4 text-[#2ED1ED]">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>

              {openIndex === index && (
                <div className="animate-fade-in bg-[#F6FBFF] px-4 pb-4 sm:px-6 sm:pb-6">
                  <p className="leading-relaxed text-[#42526B]">{item.answer}</p>
                </div>
              )}
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
