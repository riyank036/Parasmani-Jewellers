import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { craftsmanshipSteps } from '@/config/assets';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

export function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = reduced || framerReduced;
  const caps = useDeviceCapabilities();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const stepHeight = 1 / craftsmanshipSteps.length;

  const useDesktopSticky = caps.isDesktop && !allReduced;

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="bg-charcoal-900 lg:h-[500vh]"
    >
      {/* Sticky container on desktop */}
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        {/* Mobile/tablet: cinematic scroll-triggered sequence */}
        <div className="py-24 lg:py-0 lg:hidden">
          <div className="container-luxury">
            <span className="label-sm text-champagne-400">The Process</span>
            <h2 className="mt-4 font-display text-4xl font-light text-ivory-50">
              Craftsmanship
            </h2>
            <div className="mt-4 h-px w-16 bg-champagne-400" />
            <div className="mt-16 space-y-24">
              {craftsmanshipSteps.map((step) => (
                <MobileStep key={step.number} step={step} reduced={allReduced} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: sticky scroll storytelling */}
        <div className="hidden lg:flex lg:h-full lg:w-full lg:items-center">
          <div className="container-luxury grid grid-cols-2 gap-16">
            {/* Left: text steps */}
            <div className="relative flex flex-col justify-center">
              <div className="mb-12">
                <span className="label-sm text-champagne-400">The Process</span>
                <h2 className="mt-4 font-display text-5xl font-light text-ivory-50">
                  Craftsmanship
                </h2>
                <div className="mt-6 h-px w-16 bg-champagne-400" />
              </div>

              {/* Progress bar */}
              <div className="absolute left-0 top-1/2 h-32 w-px -translate-y-1/2 bg-charcoal-700">
                <motion.div
                  className="h-full w-full origin-top bg-champagne-400"
                  style={useDesktopSticky ? { scaleY: scrollYProgress } : {}}
                />
              </div>

              <div className="relative pl-8">
                {craftsmanshipSteps.map((step, i) => (
                  <DesktopStepText
                    key={step.number}
                    step={step}
                    index={i}
                    progress={scrollYProgress}
                    stepHeight={stepHeight}
                    reduced={allReduced}
                  />
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div className="relative flex items-center justify-center">
              <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden">
                {craftsmanshipSteps.map((step, i) => (
                  <DesktopStepImage
                    key={step.number}
                    step={step}
                    index={i}
                    progress={scrollYProgress}
                    stepHeight={stepHeight}
                    reduced={allReduced}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileStep({
  step,
  reduced,
}: {
  step: (typeof craftsmanshipSteps)[number];
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <span className="font-display text-3xl font-light text-champagne-400">
            {step.number}
          </span>
          <div className="mt-2 h-20 w-px bg-charcoal-700" />
        </div>
        <div className="flex-1">
          <motion.div
            className="relative mb-5 aspect-[4/3] overflow-hidden"
            initial={reduced ? {} : { opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={step.image}
              alt={`${step.title} — Parasmani Jewellers craftsmanship`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-charcoal-900/15" />
          </motion.div>
          <h3 className="font-display text-2xl font-light text-ivory-50">
            {step.title}
          </h3>
          <p className="mt-3 font-body text-base font-light leading-relaxed text-ivory-200/70">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopStepText({
  step,
  index,
  progress,
  stepHeight,
  reduced,
}: {
  step: (typeof craftsmanshipSteps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  stepHeight: number;
  reduced: boolean;
}) {
  const start = index * stepHeight;
  const end = start + stepHeight;

  const opacity = useTransform(progress, [start, start + stepHeight * 0.3, end - stepHeight * 0.3, end], [0.25, 1, 1, 0.25]);
  const y = useTransform(progress, [start, end], [20, -20]);

  return (
    <motion.div
      className="mb-12 last:mb-0"
      style={reduced ? {} : { opacity, y }}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-2xl font-light text-champagne-400">
          {step.number}
        </span>
        <h3 className="font-display text-3xl font-light text-ivory-50">
          {step.title}
        </h3>
      </div>
      <p className="mt-3 max-w-sm font-body text-base font-light leading-relaxed text-ivory-200/60">
        {step.description}
      </p>
    </motion.div>
  );
}

function DesktopStepImage({
  step,
  index,
  progress,
  stepHeight,
  reduced,
}: {
  step: (typeof craftsmanshipSteps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  stepHeight: number;
  reduced: boolean;
}) {
  const start = index * stepHeight;
  const end = start + stepHeight;

  const opacity = useTransform(progress, [start, start + stepHeight * 0.2, end - stepHeight * 0.2, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.08, 1]);

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      style={reduced ? {} : { opacity }}
    >
      <motion.img
        src={step.image}
        alt={`${step.title} — Parasmani Jewellers craftsmanship`}
        loading="lazy"
        className="h-full w-full object-cover"
        style={reduced ? {} : { scale }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-charcoal-900/20" />
    </motion.div>
  );
}
