import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections, type Collection } from '@/config/assets';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsTouch } from '@/hooks/useIsTouch';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { FadeIn } from '@/components/motion/FadeIn';

export function Collections() {
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = reduced || framerReduced;

  return (
    <section id="collections" className="bg-ivory-50 py-24 lg:py-36">
      <div className="container-luxury">
        {/* Section header */}
        <div className="mb-16 lg:mb-24">
          <FadeIn>
            <span className="label-sm">Curated by Category</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 section-heading text-4xl lg:text-5xl">
              Featured Collections
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-6 max-w-md body-lead">
              Six collections, each shaped by a distinct sensibility — from
              heritage gold to contemporary minimalism.
            </div>
          </FadeIn>
        </div>

        {/* Editorial grid: varied layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {collections.map((col, i) => (
            <CollectionCard
              key={col.id}
              collection={col}
              index={i}
              reduced={allReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  index,
  reduced,
}: {
  collection: Collection;
  index: number;
  reduced: boolean;
}) {
  const isTouch = useIsTouch();

  // Editorial column spans for visual variety
  const layoutClasses = [
    'lg:col-span-5', // 0: large left
    'lg:col-span-7', // 1: wide right top
    'lg:col-span-4', // 2: medium
    'lg:col-span-3', // 3: small
    'lg:col-span-4', // 4: medium
    'lg:col-span-3', // 5: small
  ];

  const aspectClasses: Record<string, string> = {
    tall: 'aspect-[3/4]',
    wide: 'aspect-[16/10]',
    square: 'aspect-square',
  };

  return (
    <motion.div
      className={`group relative overflow-hidden ${layoutClasses[index]} ${aspectClasses[collection.aspect]}`}
      initial={reduced ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ImageReveal className="h-full w-full">
        <img
          src={collection.image}
          alt={`${collection.name} collection — Parasmani Jewellers`}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${
            isTouch || reduced ? '' : 'group-hover:scale-[1.04]'
          }`}
        />
      </ImageReveal>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/15 to-transparent transition-opacity duration-700 group-hover:from-charcoal-900/80" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <span className="font-body text-[11px] font-medium uppercase tracking-ultra-wide text-ivory-200/70">
          Collection
        </span>
        <h3 className="mt-2 font-display text-2xl font-light text-ivory-50 lg:text-3xl">
          {collection.name}
        </h3>
        <p className="mt-2 max-w-xs font-body text-sm font-light leading-relaxed text-ivory-200/75">
          {collection.description}
        </p>
        <div className="mt-5 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wide-lg text-ivory-50 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:[translate-y:0] [translate-y:2px]">
          Explore Collection
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}
