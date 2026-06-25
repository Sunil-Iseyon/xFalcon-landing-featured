'use client';

import type { ComponentProps } from 'react';

interface OrbitalLoaderProps extends ComponentProps<'div'> {
  message?: string;
  messagePlacement?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md';
}

const placementClasses: Record<NonNullable<OrbitalLoaderProps['messagePlacement']>, string> = {
  bottom: 'flex-col',
  top: 'flex-col-reverse',
  left: 'flex-row-reverse',
  right: 'flex-row',
};

const shellSizes: Record<NonNullable<OrbitalLoaderProps['size']>, string> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
};

const ringInsets: Record<NonNullable<OrbitalLoaderProps['size']>, [string, string]> = {
  sm: ['inset-[4px]', 'inset-[8px]'],
  md: ['inset-[6px]', 'inset-[12px]'],
};

export function OrbitalLoader({
  className = '',
  message,
  messagePlacement = 'bottom',
  size = 'md',
  ...props
}: OrbitalLoaderProps) {
  const [midInset, innerInset] = ringInsets[size];

  return (
    <div className={`flex items-center justify-center gap-2 ${placementClasses[messagePlacement]}`}>
      <div className={`relative ${shellSizes[size]} ${className}`.trim()} {...props}>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-current orbital-spin" />
        <div className={`absolute ${midInset} rounded-full border-2 border-transparent border-t-current opacity-80 orbital-spin-reverse`} />
        <div className={`absolute ${innerInset} rounded-full border-2 border-transparent border-t-current opacity-60 orbital-spin-fast`} />
      </div>
      {message && <div>{message}</div>}
    </div>
  );
}
