import { Product } from '../types/marketplace';

/**
 * MOCK DATA ONLY.
 * No real 1Fi product catalog was provided with this assignment, so this file
 * simulates what a `/marketplace/products` API response might look like.
 * Replace this with a real fetch() / API client when a backend is available —
 * the rest of the app only talks to src/services/productApi.ts, never to this
 * file directly, so swapping the data source later requires no UI changes.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    category: 'Mobiles',
    basePrice: 59999,
    imageUrl:
      'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s921-sm-s921bzkein-thumb-539573419',
    shortDescription: 'Flagship AI smartphone with 120Hz display',
    description:
      'Samsung Galaxy S24 features a 6.2" Dynamic AMOLED 2X display, Snapdragon 8 Gen 3 processor, a 50MP triple camera system with Galaxy AI, and all-day battery life.',
    variants: [
      { id: 'p1-v1', label: '128 GB', priceDelta: 0 },
      { id: 'p1-v2', label: '256 GB', priceDelta: 6000 },
    ],
    highlights: [
      '6.2" Dynamic AMOLED 2X, 120Hz',
      'Snapdragon 8 Gen 3',
      '50MP triple camera with Galaxy AI',
      '25W fast charging',
    ],
  },
  {
    id: 'p2',
    name: 'Apple MacBook Air M2',
    brand: 'Apple',
    category: 'Laptops',
    basePrice: 114900,
    imageUrl:
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402',
    shortDescription: 'Ultra-thin laptop with M2 chip',
    description:
      'The redesigned MacBook Air is more capable than ever with the M2 chip, a stunning 13.6" Liquid Retina display, up to 18 hours of battery life, and a fanless design.',
    variants: [
      { id: 'p2-v1', label: '8GB/256GB', priceDelta: 0 },
      { id: 'p2-v2', label: '16GB/512GB', priceDelta: 25000 },
    ],
    highlights: [
      '13.6" Liquid Retina display',
      'Apple M2 chip, 8-core CPU',
      'Up to 18 hours battery life',
      'Fanless, silent design',
    ],
  },
  {
    id: 'p3',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Electronics',
    basePrice: 29990,
    imageUrl:
      'https://www.sony.co.in/image/5d02da5df552836db894cead8a68f5f3',
    shortDescription: 'Industry-leading noise cancelling headphones',
    description:
      'Two processors control 8 microphones for unprecedented noise cancellation. Enjoy exceptional sound quality with up to 30 hours of battery life.',
    variants: [
      { id: 'p3-v1', label: 'Black', priceDelta: 0 },
      { id: 'p3-v2', label: 'Silver', priceDelta: 0 },
    ],
    highlights: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Multipoint Bluetooth connection',
      'Speak-to-chat technology',
    ],
  },
  {
    id: 'p4',
    name: 'LG 55" 4K Smart TV',
    brand: 'LG',
    category: 'Electronics',
    basePrice: 54990,
    imageUrl:
      'https://www.lg.com/in/images/tvs/md07539564/gallery/medium01.jpg',
    shortDescription: 'UHD Smart TV with webOS',
    description:
      'Immerse yourself with 4K Ultra HD resolution, AI picture and sound processing, and access to all your favourite streaming apps with webOS.',
    variants: [
      { id: 'p4-v1', label: '55 inch', priceDelta: 0 },
      { id: 'p4-v2', label: '65 inch', priceDelta: 25000 },
    ],
    highlights: [
      '4K Ultra HD with AI upscaling',
      'webOS smart platform',
      'Dolby Vision & Atmos',
      'Magic Remote included',
    ],
  },
  {
    id: 'p5',
    name: 'Whirlpool 265L Refrigerator',
    brand: 'Whirlpool',
    category: 'Appliances',
    basePrice: 27490,
    imageUrl:
      'https://www.whirlpoolindia.com/content/dam/global/images/product-images/refrigerators/intellifresh.png',
    shortDescription: 'Frost-free double door refrigerator',
    description:
      'Keep your food fresher for longer with IntelliSense Inverter Technology, a spacious 265L capacity, and 6th Sense freshness technology.',
    variants: [
      { id: 'p5-v1', label: '265L', priceDelta: 0 },
      { id: 'p5-v2', label: '340L', priceDelta: 7000 },
    ],
    highlights: [
      'IntelliSense Inverter Technology',
      '6th Sense freshness technology',
      '3 Star energy rating',
      '10 year compressor warranty',
    ],
  },
  {
    id: 'p6',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'Mobiles',
    basePrice: 64999,
    imageUrl:
      'https://image01.oneplus.net/ce/production/i18n/media/oneplus12.png',
    shortDescription: 'Flagship killer with Hasselblad camera',
    description:
      'OnePlus 12 comes with a stunning 2K ProXDR display, Snapdragon 8 Gen 3, Hasselblad-tuned camera system, and 100W SUPERVOOC charging.',
    variants: [
      { id: 'p6-v1', label: '12GB/256GB', priceDelta: 0 },
      { id: 'p6-v2', label: '16GB/512GB', priceDelta: 5000 },
    ],
    highlights: [
      '2K ProXDR LTPO display',
      'Snapdragon 8 Gen 3',
      'Hasselblad camera system',
      '100W SUPERVOOC fast charging',
    ],
  },
  {
    id: 'p7',
    name: 'Dell XPS 13',
    brand: 'Dell',
    category: 'Laptops',
    basePrice: 129990,
    imageUrl:
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9340/media-gallery/black/laptop-xps-13-9340-black-gallery-1.psd',
    shortDescription: 'Compact premium ultrabook',
    description:
      'A stunning InfinityEdge display in an ultra-portable design, powered by Intel Core Ultra processors for exceptional performance and AI experiences.',
    variants: [
      { id: 'p7-v1', label: '16GB/512GB', priceDelta: 0 },
      { id: 'p7-v2', label: '32GB/1TB', priceDelta: 35000 },
    ],
    highlights: [
      '13.4" FHD+ InfinityEdge display',
      'Intel Core Ultra 7',
      'CNC-machined aluminum chassis',
      'Up to 12 hours battery life',
    ],
  },
  {
    id: 'p8',
    name: 'Bajaj 1.5 Ton Split AC',
    brand: 'Bajaj',
    category: 'Appliances',
    basePrice: 34990,
    imageUrl:
      'https://www.bajajelectricals.com/on/demandware.static/-/Sites-bajaj-catalog/default/images/ac-split.png',
    shortDescription: '5-star inverter split AC',
    description:
      'Cool your room efficiently with a 5-star inverter compressor, copper condenser coil, and dust filtration for cleaner air.',
    variants: [
      { id: 'p8-v1', label: '1.5 Ton', priceDelta: 0 },
      { id: 'p8-v2', label: '2 Ton', priceDelta: 8000 },
    ],
    highlights: [
      '5-star inverter compressor',
      'Copper condenser coil',
      'Dust filtration',
      '1 year comprehensive warranty',
    ],
  },
];
