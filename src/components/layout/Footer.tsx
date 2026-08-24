import { Instagram, Facebook, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { siteConfig, navigation, getFullAddress } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const iconMap: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
};

export function Footer() {
  const reduced = usePrefersReducedMotion();
  const address = getFullAddress(siteConfig);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-charcoal-100 bg-ivory-100">
      <div className="container-luxury py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-medium text-charcoal-900">
              {siteConfig.name}
            </h3>
            <div className="mt-4 h-px w-16 bg-champagne-400" />
            <p className="mt-6 max-w-xs body-text">
              Fine jewellery, crafted with care. Visit our showroom in Surat to
              experience the collection in person.
            </p>

            {/* Social */}
            {siteConfig.socialLinks.length > 0 && (
              <div className="mt-8 flex gap-5">
                {siteConfig.socialLinks.map((social) => {
                  const Icon = iconMap[social.icon] ?? Instagram;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-charcoal-400 transition-colors duration-300 hover:text-champagne-600"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="label-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="link-underline font-body text-base font-light text-charcoal-600 hover:text-charcoal-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-sm mb-6">Visit & Contact</h4>
            <address className="not-italic space-y-1">
              {address.map((line, i) => (
                <p key={i} className="font-body text-base font-light text-charcoal-600">
                  {line}
                </p>
              ))}
            </address>
            <div className="mt-6 space-y-3">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 font-body text-base font-light text-charcoal-600 transition-colors hover:text-charcoal-900"
              >
                <Phone className="h-4 w-4 text-champagne-600" strokeWidth={1.5} />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-base font-light text-charcoal-600 transition-colors hover:text-charcoal-900"
              >
                <MessageCircle className="h-4 w-4 text-champagne-600" strokeWidth={1.5} />
                {siteConfig.whatsapp}
              </a>
              <a
                href={siteConfig.emailHref}
                className="flex items-center gap-3 font-body text-base font-light text-charcoal-600 transition-colors hover:text-charcoal-900"
              >
                <Mail className="h-4 w-4 text-champagne-600" strokeWidth={1.5} />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-base font-light text-charcoal-600 transition-colors hover:text-charcoal-900"
              >
                <MapPin className="h-4 w-4 text-champagne-600" strokeWidth={1.5} />
                Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-charcoal-100 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body text-sm font-light text-charcoal-400">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="font-body text-xs font-light tracking-wide text-charcoal-300">
            Fine Jewellery · Surat, Gujarat
          </p>
        </div>
      </div>
    </footer>
  );
}
