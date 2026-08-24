import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { assets } from '@/config/assets';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function CinematicHero() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = reduced || framerReduced;

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: allReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const showVideo = assets.hero.video && !videoError;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background: video or image */}
      <div className="absolute inset-0 z-0">
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className="h-full w-full object-cover"
            poster={assets.hero.image}
          >
            <source src={assets.hero.video!} type="video/mp4" />
          </video>
        )}

        {(!showVideo || !videoLoaded) && (
          <img
            src={assets.hero.image}
            alt="Fine jewellery — Parasmani Jewellers"
            className="h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        )}
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/35 to-charcoal-900/75" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(18, 17, 16, 0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="container-luxury relative z-20 flex flex-col items-center px-6 text-center sm:px-8">
        <motion.h1
          initial={allReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="max-w-4xl hero-heading text-4xl text-ivory-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={allReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-6 max-w-lg font-body text-base font-light leading-relaxed text-ivory-100/85 sm:mt-8 sm:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={allReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6"
        >
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#collections');
            }}
            className="inline-flex items-center justify-center border border-ivory-50 bg-ivory-50 px-8 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-charcoal-900 transition-colors duration-300 hover:bg-transparent hover:text-ivory-50"
          >
            Explore Collections
          </a>
          <a
            href="#showroom"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#showroom');
            }}
            className="inline-flex items-center justify-center border border-ivory-200/50 px-8 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-50 transition-colors duration-300 hover:border-ivory-50"
          >
            Visit Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={allReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          animate={allReduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-ultra-wide text-ivory-200/50">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-ivory-200/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
