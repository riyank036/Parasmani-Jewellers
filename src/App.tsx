import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CinematicHero } from '@/components/hero/CinematicHero';
import { Collections } from '@/components/collections/Collections';
import { SelectedJewellery } from '@/components/jewellery/SelectedJewellery';
import { OurStory } from '@/components/story/OurStory';
import { Craftsmanship } from '@/components/craftsmanship/Craftsmanship';
import { Showroom } from '@/components/showroom/Showroom';
import { Contact } from '@/components/contact/Contact';
import { siteConfig } from '@/config/site';

function App() {
  useEffect(() => {
    // Local business structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'JewelryStore',
      name: siteConfig.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.area}`,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.pincode,
        addressCountry: siteConfig.address.country,
      },
      hasMap: siteConfig.mapsUrl,
      telephone: siteConfig.phone,
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50">
      <Navbar />
      <main>
        <CinematicHero />
        <Collections />
        <SelectedJewellery />
        <OurStory />
        <Craftsmanship />
        <Showroom />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
