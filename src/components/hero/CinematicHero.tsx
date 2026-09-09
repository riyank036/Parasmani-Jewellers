import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { assets } from '@/config/assets';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

const ease = [0.22, 1, 0.36, 1] as const;

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const caps = useDeviceCapabilities();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = caps.reducedMotion || framerReduced;

  // Mouse lighting (desktop only)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });
  const [spotlightActive, setSpotlightActive] = useState(false);

  useEffect(() => {
    if (caps.isTouch || allReduced) return;

    const el = heroRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlight({ x, y });
    };

    const onMouseEnter = () => setSpotlightActive(true);
    const onMouseLeave = () => setSpotlightActive(false);

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [caps.isTouch, allReduced]);

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: allReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const shouldPlayVideo = assets.hero.video && !videoError && caps.canPlayVideo;
  const showVideo = !!shouldPlayVideo;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background: poster image (always present as fallback) */}
      <div className="absolute inset-0 z-0">
        <img
          src={assets.hero.image}
          alt="Fine jewellery — Parasmani Jewellers"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Background: video overlay (fades in on load) */}
      {showVideo && (
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, ease }}
        >
          <source src={assets.hero.video!} type="video/mp4" />
        </motion.video>
      )}

      {/* Cinematic overlay: warm gradient layers for depth and text legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/30 to-charcoal-900/75" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-charcoal-900/40 via-transparent to-charcoal-900/40" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(18, 17, 16, 0.6) 100%)',
        }}
      />

      {/* Warm champagne ambient glow (touch devices) */}
      {caps.isTouch && !allReduced && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle 500px at 50% 45%, rgba(205, 163, 110, 0.08), transparent 70%)',
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Warm champagne mouse spotlight (desktop only) */}
      {!caps.isTouch && !allReduced && (
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: spotlightActive ? 1 : 0,
            background: `radial-gradient(circle 600px at ${spotlight.x}% ${spotlight.y}%, rgba(205, 163, 110, 0.1), transparent 70%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="container-luxury relative z-20 flex flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          initial={allReduced ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <span className="font-body text-xs font-medium uppercase tracking-ultra-wide text-ivory-200/75">
            
          </span>
        </motion.div>

        <motion.h1
          initial={allReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="mt-5 max-w-4xl hero-heading text-4xl text-ivory-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={allReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-6 max-w-lg font-body text-base font-light leading-relaxed text-ivory-100/85 sm:mt-8 sm:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={allReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6"
        >
          <MagneticButton
            href="#collections"
            onClick={() => handleScrollTo('#collections')}
            primary
            isTouch={caps.isTouch}
            reduced={allReduced}
          >
            Explore Collections
          </MagneticButton>
          <MagneticButton
            href="#showroom"
            onClick={() => handleScrollTo('#showroom')}
            isTouch={caps.isTouch}
            reduced={allReduced}
          >
            Visit Us
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={allReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
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

function MagneticButton({
  href,
  onClick,
  children,
  primary,
  isTouch,
  reduced,
}: {
  href: string;
  onClick: () => void;
  children: ReactNode;
  primary?: boolean;
  isTouch: boolean;
  reduced: boolean;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  useEffect(() => {
    if (isTouch || reduced) return;
    const el = btnRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      x.set(dx);
      y.set(dy);
    };

    const onMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isTouch, reduced, x, y]);

  const baseClass =
    'inline-flex items-center justify-center px-8 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg transition-colors duration-300 select-none';

  const variantClass = primary
    ? 'border border-ivory-50 bg-ivory-50 text-charcoal-900 hover:bg-transparent hover:text-ivory-50'
    : 'border border-ivory-200/50 text-ivory-50 hover:border-ivory-50';

  if (reduced) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`${baseClass} ${variantClass}`}
        style={{ width: '100%', maxWidth: isTouch ? '100%' : undefined }}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={btnRef}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`${baseClass} ${variantClass} ${
        isTouch ? 'active:scale-95 transition-transform' : ''
      }`}
      style={
        isTouch
          ? { width: '100%' }
          : { x: springX, y: springY, width: '100%', maxWidth: '200px' }
      }
      whileTap={isTouch ? { scale: 0.95 } : undefined}
    >
      {children}
    </motion.a>
  );
}
