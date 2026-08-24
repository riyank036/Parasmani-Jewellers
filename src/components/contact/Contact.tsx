import { Phone, MessageCircle, Mail, MapPin, Navigation } from 'lucide-react';
import { siteConfig, getFullAddress } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { FadeIn } from '@/components/motion/FadeIn';

export function Contact() {
  const reduced = usePrefersReducedMotion();
  const address = getFullAddress(siteConfig);

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
            <div className="mx-auto mt-6 h-px w-16 bg-champagne-400" />
          </FadeIn>
        </div>

        {/* Contact items */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <FadeIn delay={0}>
            <ContactCard
              icon={<Phone className="h-5 w-5" strokeWidth={1.5} />}
              label="Phone"
              value={siteConfig.phone}
              href={siteConfig.phoneHref}
              actionLabel="Call Us"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" strokeWidth={1.5} />}
              label="WhatsApp"
              value={siteConfig.whatsapp}
              href={siteConfig.whatsappHref}
              external
              actionLabel="WhatsApp Us"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ContactCard
              icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
              label="Email"
              value={siteConfig.email}
              href={siteConfig.emailHref}
              actionLabel="Email Us"
            />
          </FadeIn>
        </div>

        {/* Address + directions */}
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-16 max-w-2xl border-t border-charcoal-700 pt-12">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-champagne-400" strokeWidth={1.5} />
                <address className="not-italic">
                  {address.map((line, i) => (
                    <p
                      key={i}
                      className="font-body text-base font-light leading-relaxed text-ivory-200/70"
                    >
                      {line}
                    </p>
                  ))}
                </address>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ivory-50 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-50 transition-all duration-500 hover:bg-ivory-50 hover:text-charcoal-900"
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
                  className="inline-flex items-center gap-2 border border-charcoal-600 px-7 py-3.5 font-body text-sm font-medium uppercase tracking-wide-lg text-ivory-200/70 transition-all duration-500 hover:border-ivory-50 hover:text-ivory-50"
                >
                  View on Map
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  actionLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  actionLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center border border-charcoal-700 text-champagne-400">
        {icon}
      </div>
      <span className="font-body text-xs font-medium uppercase tracking-ultra-wide text-ivory-200/50">
        {label}
      </span>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="font-body text-base font-light text-ivory-100 transition-colors duration-300 hover:text-champagne-300"
      >
        {value}
      </a>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="mt-1 link-underline font-body text-xs font-medium uppercase tracking-wide-lg text-champagne-400"
      >
        {actionLabel}
      </a>
    </div>
  );
}
