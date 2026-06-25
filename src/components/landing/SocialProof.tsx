'use client';

interface SocialProofProps {
  text: string;
  logos: string[];
}

export function SocialProof({ text, logos }: SocialProofProps) {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <p className="text-center text-gray-600 font-medium">{text}</p>
        
        {/* Logo marquee */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div key={index} className="text-gray-400 font-semibold text-sm md:text-base grayscale opacity-60 hover:opacity-100 transition-opacity">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
