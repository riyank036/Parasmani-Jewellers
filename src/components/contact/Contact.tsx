import { Phone, MessageCircle, Mail, Navigation } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { FadeIn } from '@/components/motion/FadeIn';

export function Contact() {
  const reduced = usePrefersReducedMotion();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section id="contact" className="bg-charcoal-900 py-24 lg:py-36">
      <div className="container-luxury">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <span className="font-body text-xs font-medium uppercase tracking-ultra-wide text-champagne-400">
              Contact
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 font-display text-4xl font-light text-ivory-50 lg:text-5xl">
              Discover the Jewellery.
              <br />
              Experience It in Person.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg font-body text-base font-light leading-relaxed text-ivory-200/70">
              Visit our showroom on Ghod Dod Road, Surat — or reach us directly.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mx-auto mt-6 h-px w-16 bg-champagne-400" />
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
          <FadeIn delay={0}>
            <ContactCard
              icon={<Phone className="h-5 w-5" strokeWidth={1.5} />}
              label="Phone"
              href={siteConfig.phoneHref}
              actionLabel={siteConfig.phone}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" strokeWidth={1.5} />}
              label="WhatsApp"
              href={siteConfig.whatsappHref}
              external
              actionLabel={siteConfig.whatsapp}
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ContactCard
              icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
              label="Email"
              href={siteConfig.emailHref}
              actionLabel={siteConfig.email}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mx-auto mt-16 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 border border-ivory-50 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-50 transition-colors duration-300 hover:bg-ivory-50 hover:text-charcoal-900 sm:w-auto"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.5} />
              Get Directions
            </a>
            <a
              href="#showroom"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#showroom');
              }}
              className="inline-flex w-full items-center justify-center gap-2 border border-charcoal-600 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-200/70 transition-colors duration-300 hover:border-ivory-50 hover:text-ivory-50 sm:w-auto"
            >
              View Showroom
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  href,
  external,
  actionLabel,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
  actionLabel: string;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex flex-col items-center gap-4 border border-charcoal-700 px-6 py-8 text-center transition-colors duration-300 hover:border-champagne-500/50"
    >
      <div className="flex h-12 w-12 items-center justify-center border border-charcoal-700 text-champagne-400">
        {icon}
      </div>
      <span className="font-body text-xs font-medium uppercase tracking-ultra-wide text-ivory-200/50">
        {label}
      </span>
      <span className="link-underline font-body text-sm font-medium uppercase tracking-wide-lg text-champagne-400">
        {actionLabel}
      </span>
    </a>
  );
}
