/**
 * Domain types for the 1Fi Marketplace feature.
 * All product/EMI data is MOCK DATA — see src/data/mockProducts.ts.
 */

export type ProductCategory =
  | 'Mobiles'
  | 'Laptops'
  | 'Electronics'
  | 'Appliances';

export interface ProductVariant {
  id: string;
  label: string; // e.g. "128 GB", "8GB RAM / 256GB SSD"
  priceDelta: number; // added to base price when this variant is selected
}

export interface EmiPlan {
  id: string;
  months: number; // duration, e.g. 3, 6, 9, 12
  monthlyAmount: number; // computed for the given price, mock calculation
  interestNote: string; // e.g. "No-cost EMI" or "0% interest"
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  basePrice: number; // price of the default/first variant
  imageUrl: string;
  shortDescription: string;
  description: string;
  variants: ProductVariant[];
  highlights: string[]; // bullet-style product details
}

export interface ProductListItem {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  basePrice: number;
  imageUrl: string;
  shortDescription: string;
  emiFromPerMonth: number; // "EMI from ₹X/month" shown on the card
}
