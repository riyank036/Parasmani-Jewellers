export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  address: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  mapsUrl: string;
  mapsEmbedQuery: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const siteConfig: SiteConfig = {
  name: 'Parasmani Jewellers',
  tagline: 'Timeless Jewellery. Beautifully Crafted.',
  description:
    'Discover jewellery shaped by craftsmanship, detail and enduring beauty.',
  address: {
    line1: '13-A, Ground Floor, Ritz Plaza',
    line2: 'Ghod Dod Road',
    area: 'Opposite Narmad Library',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395007',
    country: 'India',
  },
  mapsUrl: 'https://maps.app.goo.gl/GkF4DekhoXvyBaXF9',
  mapsEmbedQuery: 'Parasmani Jewellers Ghod Dod Road Surat',
  // --- PLACEHOLDERS: Replace with real contact details ---
  phone: '+91 XXXXX XXXXX',
  phoneHref: 'tel:+91XXXXXXXXXX',
  whatsapp: '+91 XXXXX XXXXX',
  whatsappHref: 'https://wa.me/91XXXXXXXXXX',
  email: 'hello@example.com',
  emailHref: 'mailto:hello@example.com',
  // --- PLACEHOLDERS: Replace with real social links or remove ---
  socialLinks: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'Facebook', href: '#', icon: 'facebook' },
  ],
};

export const navigation: NavItem[] = [
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#story' },
  { label: 'Craftsmanship', href: '#craftsmanship' },
  { label: 'Visit Us', href: '#showroom' },
  { label: 'Contact', href: '#contact' },
];

interface NavItem {
  label: string;
  href: string;
}

export function getFullAddress(config: SiteConfig): string[] {
  return [
    config.address.line1,
    config.address.line2,
    config.address.area,
    `${config.address.city}, ${config.address.state} ${config.address.pincode}`,
    config.address.country,
  ];
}
