import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { assets } from '@/config/assets';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsTouch } from '@/hooks/useIsTouch';

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const isTouch = useIsTouch();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });

  const allReduced = reduced || framerReduced;

  useEffect(() => {
    if (isTouch || allReduced) return;

    const el = heroRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlight({ x, y });
    };

    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, [isTouch, allReduced]);

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: allReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const showVideo = assets.hero.video && !videoError;

  return (
    <section
      ref={heroRef}
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

        {/* Image: shown as fallback or while video loads */}
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

      {/* Cinematic overlay: warm gradient + vignette */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal-900/50 via-charcoal-900/30 to-charcoal-900/70" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(18, 17, 16, 0.5) 100%)',
        }}
      />

      {/* Subtle mouse-reactive spotlight (desktop only) */}
      {!isTouch && !allReduced && (
        <div
          className="absolute inset-0 z-10 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 600px at ${spotlight.x}% ${spotlight.y}%, rgba(205, 163, 110, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="container-luxury relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={allReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-body text-xs font-medium uppercase tracking-ultra-wide text-ivory-200/80">
            {siteConfig.name} · Surat, Gujarat
          </span>
        </motion.div>

        <motion.h1
          initial={allReduced ? {} : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl hero-heading text-4xl text-ivory-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={allReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl font-body text-lg font-light leading-relaxed text-ivory-100/80"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={allReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#collections');
            }}
            className="inline-flex items-center justify-center border border-ivory-50 bg-ivory-50 px-9 py-4 font-body text-sm font-medium uppercase tracking-wide-lg text-charcoal-900 transition-all duration-500 hover:bg-transparent hover:text-ivory-50"
          >
            Explore Collections
          </a>
          <a
            href="#showroom"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#showroom');
            }}
            className="inline-flex items-center justify-center border border-ivory-200/40 px-9 py-4 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-50 transition-all duration-500 hover:border-ivory-50"
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
        transition={{ duration: 1, delay: 1.6 }}
      >
        <motion.div
          animate={
            allReduced
              ? {}
              : { y: [0, 8, 0] }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-[10px] uppercase tracking-ultra-wide text-ivory-200/60">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-ivory-200/60" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
