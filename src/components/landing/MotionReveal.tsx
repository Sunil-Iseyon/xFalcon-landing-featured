'use client';

import { memo, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}

export const MotionReveal = memo(function MotionReveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.55,
  y = 16,
  once = true,
  amount = 0.15,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const mergedStyle = {
    willChange: 'transform, opacity',
    ...style,
  } satisfies CSSProperties;

  if (shouldReduceMotion) {
    return (
      <div className={cn(className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn('transform-gpu', className)}
      style={mergedStyle}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
});
