import { EmiPlan, ProductVariant } from '../types/marketplace';

/**
 * Root stack: hosts the bottom-tab navigator plus screens that should
 * appear full-screen above the tabs (Marketplace flow + Confirmation).
 */
export type RootStackParamList = {
  MainTabs: undefined;
  Marketplace: undefined;
  ProductDetails: { productId: string };
  Confirmation: {
    productId: string;
    productName: string;
    productImageUrl: string;
    variant: ProductVariant;
    totalPrice: number;
    emiPlan: EmiPlan;
  };
};

/** Bottom tab navigator shown on Home / Shop. */
export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
};

/** Top tabs inside the Shop screen (Top Brands / Nearby Stores). Marketplace is a CTA, not a tab. */
export type ShopTopTabParamList = {
  TopBrands: undefined;
  NearbyStores: undefined;
};
