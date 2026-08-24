import { assets } from '@/config/assets';
import { FadeIn } from '@/components/motion/FadeIn';
import { ImageReveal } from '@/components/motion/ImageReveal';

export function OurStory() {
  return (
    <section id="story" className="bg-ivory-50 py-24 lg:py-36">
      <div className="container-luxury">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <ImageReveal className="overflow-hidden aspect-[4/5]">
              <img
                src={assets.story}
                alt="The art of jewellery — Parasmani Jewellers"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </ImageReveal>
          </div>

          <div className="order-1 lg:order-2">
            <FadeIn>
              <span className="label-sm">Our Story</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 section-heading text-4xl lg:text-5xl">
                Crafted with Care,
                <br />
                Worn with Meaning
              </h2>
            </FadeIn>
            <div className="mt-8 space-y-6">
              <FadeIn delay={0.2}>
                <p className="body-lead">
                  At Parasmani Jewellers, jewellery is more than ornament — it is
                  a quiet expression of identity, a marker of moments, and a
                  craft carried forward by patient hands.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="body-text">
                  Every piece in our showroom is chosen with intention — for its
                  material, its making, and the way it rests against the skin.
                  Visit us in Surat, hold the jewellery, and find what speaks to
                  you.
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.4}>
              <div className="mt-10 h-px w-16 bg-champagne-400" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
