export interface AssetConfig {
  hero: {
    video: string | null;
    image: string;
  };
  collections: {
    gold: string;
    diamond: string;
    bridal: string;
    traditional: string;
    contemporary: string;
    everyday: string;
  };
  jewellery: string[];
  story: string;
  craftsmanship: string[];
  showroom: string;
}

// All image/video paths are centralized here for easy replacement.
// Photos are from Pexels (free to use). Replace with your own assets anytime.
export const assets: AssetConfig = {
  hero: {
    // Set to a local video path like '/videos/jewellery-hero.mp4' when available
    video: null,
    image:
      'https://images.pexels.com/photos/24815712/pexels-photo-24815712.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  collections: {
    gold: 'https://images.pexels.com/photos/4889719/pexels-photo-4889719.jpeg?auto=compress&cs=tinysrgb&w=1200',
    diamond: 'https://images.pexels.com/photos/19820885/pexels-photo-19820885.jpeg?auto=compress&cs=tinysrgb&w=1200',
    bridal: 'https://images.pexels.com/photos/35059564/pexels-photo-35059564.jpeg?auto=compress&cs=tinysrgb&w=1200',
    traditional: 'https://images.pexels.com/photos/28347073/pexels-photo-28347073.jpeg?auto=compress&cs=tinysrgb&w=1200',
    contemporary: 'https://images.pexels.com/photos/38827895/pexels-photo-38827895.jpeg?auto=compress&cs=tinysrgb&w=1200',
    everyday: 'https://images.pexels.com/photos/30541170/pexels-photo-30541170.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  jewellery: [
    'https://images.pexels.com/photos/17833830/pexels-photo-17833830.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/7509251/pexels-photo-7509251.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/4741611/pexels-photo-4741611.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/32988532/pexels-photo-32988532.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/13292955/pexels-photo-13292955.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/11476471/pexels-photo-11476471.jpeg?auto=compress&cs=tinysrgb&w=1000',
  ],
  story: 'https://images.pexels.com/photos/8706570/pexels-photo-8706570.jpeg?auto=compress&cs=tinysrgb&w=1200',
  craftsmanship: [
    'https://images.pexels.com/photos/15955333/pexels-photo-15955333.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/4354610/pexels-photo-4354610.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/6263146/pexels-photo-6263146.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/23232400/pexels-photo-23232400.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/5442475/pexels-photo-5442475.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  showroom: 'https://images.pexels.com/photos/33257666/pexels-photo-33257666.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  aspect: 'tall' | 'wide' | 'square';
}

export const collections: Collection[] = [
  {
    id: 'gold',
    name: 'Gold',
    description: 'Timeless gold pieces crafted with enduring warmth and radiance.',
    image: assets.collections.gold,
    aspect: 'tall',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    description: 'Brilliant-cut diamonds set in designs that capture every light.',
    image: assets.collections.diamond,
    aspect: 'wide',
  },
  {
    id: 'bridal',
    name: 'Bridal',
    description: 'Ornaments for the milestone — heirlooms in the making.',
    image: assets.collections.bridal,
    aspect: 'tall',
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Designs rooted in heritage, carrying the weight of tradition.',
    image: assets.collections.traditional,
    aspect: 'square',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Clean lines and modern forms for the discerning eye.',
    image: assets.collections.contemporary,
    aspect: 'tall',
  },
  {
    id: 'everyday',
    name: 'Everyday',
    description: 'Understated elegance for daily wear, without compromise.',
    image: assets.collections.everyday,
    aspect: 'square',
  },
];

export interface JewelleryPiece {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export const jewelleryPieces: JewelleryPiece[] = [
  {
    id: 'piece-1',
    name: 'Aurora Pendant',
    category: 'Gold',
    description: 'A delicate gold pendant with a single brilliant accent.',
    image: assets.jewellery[0],
  },
  {
    id: 'piece-2',
    name: 'Celeste Earrings',
    category: 'Diamond',
    description: 'Chevron-set diamond earrings that catch every flicker of light.',
    image: assets.jewellery[1],
  },
  {
    id: 'piece-3',
    name: 'Emerald Cascade',
    category: 'Traditional',
    description: 'An emerald pendant with gold chain, soft and quietly luminous.',
    image: assets.jewellery[2],
  },
  {
    id: 'piece-4',
    name: 'Imperial Bangle',
    category: 'Diamond',
    description: 'Diamond and emerald bangle with a warm, regal presence.',
    image: assets.jewellery[3],
  },
  {
    id: 'piece-5',
    name: 'Featherlight Pendant',
    category: 'Gold',
    description: 'A gold pendant resting against soft texture — light as air.',
    image: assets.jewellery[4],
  },
  {
    id: 'piece-6',
    name: 'Solenne Bracelet',
    category: 'Contemporary',
    description: 'Gold bracelet with diamond detail, structured and refined.',
    image: assets.jewellery[5],
  },
];

export interface CraftsmanshipStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const craftsmanshipSteps: CraftsmanshipStep[] = [
  {
    number: '01',
    title: 'Inspiration',
    description: 'Every piece begins with an idea — drawn from form, light, and the character of the material itself.',
    image: assets.craftsmanship[0],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Sketches become precise renderings. Proportions, weight, and balance are refined until the design is resolved.',
    image: assets.craftsmanship[1],
  },
  {
    number: '03',
    title: 'Craft',
    description: 'Hands shape metal with fire and precision. Each component is formed, joined, and assembled by skilled artisans.',
    image: assets.craftsmanship[2],
  },
  {
    number: '04',
    title: 'Detail',
    description: 'Under magnification, every surface is examined, refined, and polished until nothing remains accidental.',
    image: assets.craftsmanship[3],
  },
  {
    number: '05',
    title: 'Jewellery',
    description: 'What remains is the finished piece — ready to be worn, treasured, and carried forward.',
    image: assets.craftsmanship[4],
  },
];
