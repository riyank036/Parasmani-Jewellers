import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

export function ImageReveal({
  children,
  className,
  once = true,
}: ImageRevealProps) {
  const framerReduced = useReducedMotion() ?? false;
  const hookReduced = usePrefersReducedMotion();
  const reduced = framerReduced || hookReduced;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
