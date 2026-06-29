'use client';

interface Testimonial {
  company?: string;
  logo?: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  heading: string;
  items: Testimonial[];
}

export function TestimonialsSection({ heading, items }: TestimonialsSectionProps) {
  return (
    <section className="py-20 lg:py-32 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto space-y-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 text-center" style={{ letterSpacing: '-0.02em' }}>
          {heading}
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((testimonial, index) => (
            <div
              key={index}
              className="group p-5 sm:p-8 rounded-3xl bg-white/70 backdrop-filter backdrop-blur-lg border border-white/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl animate-stagger-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Company logo or badge */}
              {testimonial.company && (
                <div className="mb-6 inline-block px-3 py-1 bg-red-100 rounded-full text-red-600 font-semibold text-sm">
                  {testimonial.company}
                </div>
              )}

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-[#2ED1ED] rounded-full flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
