import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { jewelleryPieces } from '@/config/assets';
import { siteConfig } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsTouch } from '@/hooks/useIsTouch';
import { FadeIn } from '@/components/motion/FadeIn';
import { ImageReveal } from '@/components/motion/ImageReveal';

export function SelectedJewellery() {
  return (
    <section id="jewellery" className="bg-ivory-100 py-24 lg:py-36">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
          <div>
            <FadeIn>
              <span className="label-sm">From Our Collection</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 section-heading text-4xl lg:text-5xl">
                Selected Pieces
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="max-w-sm body-lead">
              A curated selection from our showroom — each piece available to
              view in person.
            </p>
          </FadeIn>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {jewelleryPieces.map((piece, i) => (
            <JewelleryCard key={piece.id} piece={piece} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JewelleryCard({
  piece,
  index,
}: {
  piece: (typeof jewelleryPieces)[number];
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = reduced || framerReduced;
  const isTouch = useIsTouch();

  const enquiryHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(
    `I'd like to enquire about ${piece.name} (${piece.category}).`
  )}`;

  return (
    <motion.article
      initial={allReduced ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-ivory-200">
        <ImageReveal className="h-full w-full">
          <img
            src={piece.image}
            alt={`${piece.name} — ${piece.category} — Parasmani Jewellers`}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${
              isTouch || allReduced ? '' : 'group-hover:scale-[1.05]'
            }`}
          />
        </ImageReveal>

        {/* Enquire button on hover */}
        <a
          href={enquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-ivory-50/90 text-charcoal-900 backdrop-blur-sm transition-all duration-500 ${
            isTouch ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label={`Enquire about ${piece.name}`}
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
        </a>
      </div>

      {/* Info */}
      <div className="mt-5">
        <span className="label-sm text-[10px]">{piece.category}</span>
        <h3 className="mt-2 font-display text-xl font-light text-charcoal-900">
          {piece.name}
        </h3>
        <p className="mt-2 body-text text-sm">{piece.description}</p>
        <a
          href={enquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wide-lg text-champagne-600 transition-colors duration-300 hover:text-champagne-700"
        >
          Enquire
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </motion.article>
  );
}
