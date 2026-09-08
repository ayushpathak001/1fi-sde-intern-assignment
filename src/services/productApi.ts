import { MOCK_PRODUCTS } from '../data/mockProducts';
import { EmiPlan, Product, ProductListItem } from '../types/marketplace';

/**
 * Mock API layer for the 1Fi Marketplace.
 *
 * No backend/source repository was provided with this assignment, so every
 * function here simulates a network request (latency + occasional failure)
 * over the local mock dataset in src/data/mockProducts.ts.
 *
 * IMPORTANT: screens and components never import mockProducts.ts directly —
 * they only call the functions exported from this file. That means swapping
 * this mock layer for a real backend later (e.g. fetch('/api/marketplace/...'))
 * requires changing only this file, not any UI code.
 */

const NETWORK_DELAY_MS = 500;

/** Set to a value > 0 to rehearse the error state during development, e.g. 0.15 for ~15% failures. */
const SIMULATED_FAILURE_RATE = 0;

function simulateNetwork<T>(result: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < SIMULATED_FAILURE_RATE) {
        reject(new Error('Network request failed'));
      } else {
        resolve(result);
      }
    }, NETWORK_DELAY_MS);
  });
}

/** EMI durations offered on every product, mirroring the assignment's example (3/6/9/12 months). */
const EMI_DURATIONS_MONTHS = [3, 6, 9, 12];

/**
 * Computes mock EMI plans for a given price. This is a simplified
 * "no-cost EMI" calculation (principal / months) for demo purposes only —
 * it is not a real interest/finance calculation.
 */
function buildEmiPlans(price: number): EmiPlan[] {
  return EMI_DURATIONS_MONTHS.map((months) => ({
    id: `emi-${months}`,
    months,
    monthlyAmount: Math.round(price / months),
    interestNote: 'No-cost EMI',
  }));
}

function toListItem(product: Product): ProductListItem {
  const shortestPlan = buildEmiPlans(product.basePrice).reduce((min, plan) =>
    plan.monthlyAmount < min.monthlyAmount ? plan : min
  );
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    basePrice: product.basePrice,
    imageUrl: product.imageUrl,
    shortDescription: product.shortDescription,
    emiFromPerMonth: shortestPlan.monthlyAmount,
  };
}

export interface GetProductsParams {
  query?: string;
  category?: string;
}

/** Simulated GET /marketplace/products */
export async function getProducts(
  params: GetProductsParams = {}
): Promise<ProductListItem[]> {
  const { query, category } = params;
  let results = MOCK_PRODUCTS;

  if (category) {
    results = results.filter((p) => p.category === category);
  }
  if (query && query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }

  return simulateNetwork(results.map(toListItem));
}

/** Simulated GET /marketplace/products/:id */
export async function getProductById(id: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  return simulateNetwork(product);
}

/**
 * Simulated GET /marketplace/products/:id/variants/:variantId/emi-plans
 * Price is derived from the product's base price plus the selected variant's price delta.
 */
export async function getEmiPlans(
  productId: string,
  variantId: string
): Promise<EmiPlan[]> {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return simulateNetwork([]);
  }
  const variant = product.variants.find((v) => v.id === variantId);
  const price = product.basePrice + (variant?.priceDelta ?? 0);
  return simulateNetwork(buildEmiPlans(price));
}

/** Distinct categories available, used to render the category chip row. */
export async function getCategories(): Promise<string[]> {
  const categories = Array.from(
    new Set(MOCK_PRODUCTS.map((p) => p.category))
  );
  return simulateNetwork(categories);
}
