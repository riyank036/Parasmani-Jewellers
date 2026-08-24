import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Navigation, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, getFullAddress } from '@/config/site';
import { assets } from '@/config/assets';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { FadeIn } from '@/components/motion/FadeIn';
import { ImageReveal } from '@/components/motion/ImageReveal';

export function Showroom() {
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = reduced || framerReduced;
  const address = getFullAddress(siteConfig);

  return (
    <section id="showroom" className="bg-ivory-50 py-24 lg:py-36">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <FadeIn>
            <span className="label-sm">Find Us</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 section-heading text-4xl lg:text-5xl">
              Visit Parasmani Jewellers
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mx-auto mt-6 h-px w-16 bg-champagne-400" />
          </FadeIn>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: address and CTAs */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <div className="mb-8 flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-champagne-600" strokeWidth={1.5} />
                <address className="not-italic">
                  {address.map((line, i) => (
                    <p
                      key={i}
                      className="font-body text-lg font-light leading-relaxed text-charcoal-700"
                    >
                      {line}
                    </p>
                  ))}
                </address>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-charcoal-900 bg-charcoal-900 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-50 transition-all duration-500 hover:bg-charcoal-800"
                >
                  <Navigation className="h-4 w-4" strokeWidth={1.5} />
                  Get Directions
                </a>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-charcoal-300 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-charcoal-700 transition-all duration-500 hover:border-charcoal-900 hover:text-charcoal-900"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  WhatsApp Us
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center justify-center gap-2 border border-charcoal-300 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-charcoal-700 transition-all duration-500 hover:border-charcoal-900 hover:text-charcoal-900"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  Call Us
                </a>
              </div>
            </FadeIn>

            {/* Showroom image */}
            <FadeIn delay={0.3}>
              <div className="mt-10 overflow-hidden aspect-[16/10]">
                <ImageReveal className="h-full w-full">
                  <img
                    src={assets.showroom}
                    alt="Parasmani Jewellers showroom interior"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </ImageReveal>
              </div>
            </FadeIn>
          </div>

          {/* Right: Google Map */}
          <FadeIn delay={0.2}>
            <div className="relative h-full min-h-[400px] overflow-hidden border border-charcoal-100">
              <GoogleMap />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function GoogleMap() {
  const reduced = usePrefersReducedMotion();
  const framerReduced = useReducedMotion() ?? false;
  const allReduced = reduced || framerReduced;

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.mapsEmbedQuery
  )}&output=embed`;

  return (
    <motion.iframe
      title="Parasmani Jewellers location map"
      src={embedSrc}
      className="absolute inset-0 h-full w-full"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      initial={allReduced ? {} : { opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
