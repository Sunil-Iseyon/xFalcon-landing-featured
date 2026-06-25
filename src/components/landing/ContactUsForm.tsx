import { cn } from '@/lib/utils';

interface ContactUsFormProps {
  title?: string;
  containerClassName?: string;
  titleClassName?: string;
  formClassName?: string;
  inputClassName?: string;
  textareaClassName?: string;
  buttonClassName?: string;
}

export function ContactUsForm({
  title = 'Contact Us',
  containerClassName,
  titleClassName,
  formClassName,
  inputClassName,
  textareaClassName,
  buttonClassName,
}: ContactUsFormProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)] md:p-8',
        containerClassName,
      )}
    >
      <h3 className={cn('text-2xl font-bold text-[#0B1220]', titleClassName)}>{title}</h3>
      <form className={cn('mt-6 grid grid-cols-1 gap-4 md:grid-cols-2', formClassName)}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className={cn(
            'rounded-xl border border-[#cbd5e1] px-4 py-3 text-sm text-[#0B1220] outline-none focus:border-[#2ED1ED]',
            inputClassName,
          )}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className={cn(
            'rounded-xl border border-[#cbd5e1] px-4 py-3 text-sm text-[#0B1220] outline-none focus:border-[#2ED1ED]',
            inputClassName,
          )}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          className={cn(
            'rounded-xl border border-[#cbd5e1] px-4 py-3 text-sm text-[#0B1220] outline-none focus:border-[#2ED1ED] md:col-span-2',
            inputClassName,
          )}
        />
        <textarea
          name="message"
          placeholder="Tell us what you want to explore"
          className={cn(
            'min-h-32 rounded-xl border border-[#cbd5e1] px-4 py-3 text-sm text-[#0B1220] outline-none focus:border-[#2ED1ED] md:col-span-2',
            textareaClassName,
          )}
        />
        <button
          type="submit"
          className={cn(
            'rounded-full bg-linear-to-r from-[#06B6D4] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-all hover:from-[#0891B2] hover:to-[#1D4ED8] md:col-span-2',
            buttonClassName,
          )}
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}