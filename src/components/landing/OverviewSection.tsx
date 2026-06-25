import { MotionReveal } from '@/components/landing/MotionReveal';

interface OverviewSectionProps {
  heading: string;
  content: string;
  imageSrc?: string;
}

export function OverviewSection({
  heading,
  content,
  imageSrc,
}: OverviewSectionProps) {
  return (
    <section id="overview" className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6 order-2 lg:order-1">
          <MotionReveal>
            <p className="inline-flex items-center rounded-full border border-[#bae6fd] bg-[#f0f9ff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0369a1]">
              About
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1220]">
              {heading}
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.16}>
            <p className="text-lg text-[#42526B] leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </MotionReveal>
        </div>

        {/* Image or Placeholder */}
        {imageSrc ? (
          <MotionReveal delay={0.1} className="order-1 lg:order-2 rounded-xl overflow-hidden bg-white border border-[#D7DEE8] shadow-[0_10px_30px_rgba(6,17,34,0.08)] p-3">
            <img
              src={imageSrc}
              alt={heading}
              className="w-full h-96 object-contain bg-[#F8FBFF] rounded-lg"
            />
          </MotionReveal>
        ) : (
          <MotionReveal delay={0.1} className="order-1 lg:order-2 w-full h-96 bg-linear-to-br from-[#E6FBFF] to-[#F5F8FC] rounded-xl border border-[#D7DEE8] flex items-center justify-center">
            <div className="text-center">
              <div className="text-[#2ED1ED] text-6xl font-bold">📊</div>
              <p className="text-[#5C6C82] mt-4">Visual placeholder</p>
            </div>
          </MotionReveal>
        )}
      </div>
    </section>
  );
}
