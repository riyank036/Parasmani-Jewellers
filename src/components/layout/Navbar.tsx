import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { siteConfig, navigation } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? 'bg-ivory-50/90 backdrop-blur-md border-b border-charcoal-100'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-luxury flex items-center justify-between py-5 lg:py-6">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex flex-col leading-none"
          >
            <span
              className={`font-display text-xl font-medium tracking-wide transition-colors duration-500 lg:text-2xl ${
                scrolled ? 'text-charcoal-900' : 'text-ivory-50'
              }`}
            >
              {siteConfig.name}
            </span>
            <span
              className={`mt-1 font-body text-[10px] uppercase tracking-ultra-wide transition-colors duration-500 ${
                scrolled ? 'text-champagne-600' : 'text-ivory-200/70'
              }`}
            >
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`link-underline font-body text-sm font-light tracking-wide transition-colors duration-500 ${
                  scrolled
                    ? 'text-charcoal-600 hover:text-charcoal-900'
                    : 'text-ivory-100/80 hover:text-ivory-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop action buttons */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 font-body text-sm font-light transition-colors duration-500 ${
                scrolled
                  ? 'text-charcoal-600 hover:text-charcoal-900'
                  : 'text-ivory-100/80 hover:text-ivory-50'
              }`}
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              WhatsApp
            </a>
            <a
              href={siteConfig.phoneHref}
              className={`flex items-center gap-2 font-body text-sm font-light transition-colors duration-500 ${
                scrolled
                  ? 'text-charcoal-600 hover:text-charcoal-900'
                  : 'text-ivory-100/80 hover:text-ivory-50'
              }`}
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              Call
            </a>
          </div>

          {/* Mobile actions + menu */}
          <div className="flex items-center gap-4 lg:hidden">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              className={`transition-colors duration-500 ${
                scrolled ? 'text-charcoal-700' : 'text-ivory-100/90'
              }`}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className={`transition-colors duration-500 ${
                scrolled ? 'text-charcoal-900' : 'text-ivory-50'
              }`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-[60] bg-ivory-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduced ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-luxury flex items-center justify-between py-5">
              <span className="font-display text-xl font-medium text-charcoal-900">
                {siteConfig.name}
              </span>
              <button
                ref={closeBtnRef}
                onClick={() => setMenuOpen(false)}
                className="text-charcoal-900"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <motion.nav
              className="container-luxury mt-12 flex flex-col gap-1"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                { label: 'Home', href: '#hero' },
                ...navigation,
              ].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="border-b border-charcoal-100 py-5 font-display text-3xl font-light text-charcoal-800"
                  initial={reduced ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.div
                className="mt-10 flex flex-col gap-4"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-base text-charcoal-700"
                >
                  <MessageCircle className="h-5 w-5 text-champagne-600" strokeWidth={1.5} />
                  WhatsApp Us
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-3 font-body text-base text-charcoal-700"
                >
                  <Phone className="h-5 w-5 text-champagne-600" strokeWidth={1.5} />
                  Call Us
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
