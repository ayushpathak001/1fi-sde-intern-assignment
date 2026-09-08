# 1Fi Marketplace

A standalone React Native (Expo) implementation of the **1Fi Marketplace** feature, built as part of the 1Fi SDE Intern Assignment. It adds a fully-functional Marketplace section to the Shop page, styled to match the existing 1Fi app's purple, rounded, financial-app aesthetic.

## Overview

The assignment asked for the Shop page to offer three options — **Top Brands**, **Nearby Stores**, and **1Fi Marketplace** — with only the Marketplace section requiring full implementation. This project rebuilds a Shop screen matching the provided screenshots and implements a complete Marketplace flow: browse products → view details → pick a variant → pick an EMI plan → confirm.

No original 1Fi source code or backend was provided, so this is a **standalone Expo app** with a mock data/API layer standing in for a real backend.

## Features

- Shop screen with the purple promo banner, a Top Brands / Nearby Stores selector, and a dedicated "1Fi Marketplace" entry point
- Marketplace listing: search, category filters, responsive 2-column product grid
- Product Details: image, price, description, highlights
- Variant selection (e.g. storage size) with a clear selected/unselected state, updating the displayed price live
- EMI plan selection (3/6/9/12 months) with live monthly-amount calculation
- Proceed CTA that's disabled until a variant and EMI plan are both selected
- Confirmation screen summarizing product, variant, price, and EMI plan
- Loading / error (with retry) / empty states on both the listing and details screens
- Centralized theme (colors, spacing, typography) — no hardcoded style values scattered through components

## Tech Stack

- React Native + Expo (SDK 51)
- TypeScript
- React Navigation (native-stack + bottom-tabs)
- Functional components + hooks only
- No backend — a mock async data/API layer simulates real network calls

## Architecture

```
src/
├── components/       Reusable, presentation-only UI pieces
│   ├── ProductCard/
│   ├── SearchBar/
│   ├── CategoryChip/
│   ├── VariantSelector/
│   ├── EmiPlanCard/
│   ├── PrimaryButton/
│   └── StateViews/    Loading / Error / Empty state views
├── screens/          One folder per screen, screen owns its own data-fetching
│   ├── Home/
│   ├── Shop/
│   ├── TopBrands/     Placeholder — intentionally blank
│   ├── NearbyStores/  Placeholder — intentionally blank
│   ├── Marketplace/
│   ├── ProductDetails/
│   └── Confirmation/
├── navigation/
│   ├── AppNavigator.tsx      Root stack (tabs + Marketplace flow)
│   ├── MainTabNavigator.tsx  Bottom tabs (Home, Shop)
│   └── types.ts              Typed navigation param lists
├── services/
│   └── productApi.ts   Mock API layer — the only thing screens call
├── data/
│   └── mockProducts.ts Raw mock dataset (never imported by screens directly)
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts
├── types/
│   └── marketplace.ts  Product / Variant / EmiPlan / ProductListItem types
└── utils/
    └── format.ts        Currency formatting helper
```

## Data/API Approach

Because the original 1Fi codebase and backend were not provided, this project uses a **mock API layer** (`src/services/productApi.ts`) instead of hardcoding data into components:

- `getProducts({ query, category })` — simulated `GET /marketplace/products`
- `getProductById(id)` — simulated `GET /marketplace/products/:id`
- `getEmiPlans(productId, variantId)` — simulated `GET .../emi-plans`
- `getCategories()` — distinct product categories for the filter chips

Every function is `async` and adds artificial latency (`setTimeout`) to mimic a real network round trip, and has a configurable simulated failure rate for rehearsing the error state. **Screens and components never import `mockProducts.ts` directly** — they only call functions from `productApi.ts`. That means swapping in a real backend later is a change to one file, not a UI rewrite.

EMI amounts are a simplified "no-cost EMI" calculation (`price / months`) for demo purposes — clearly not a real interest/finance calculation, and the Product Details screen labels the numbers as sample data.

## Screens

| Screen | Purpose |
|---|---|
| **Home** | Minimal placeholder tab, out of scope for this assignment |
| **Shop** | Purple promo banner, Top Brands / Nearby Stores selector, and the 1Fi Marketplace entry card |
| **Top Brands / Nearby Stores** | Intentionally blank placeholders per the assignment |
| **Marketplace** | Product listing: search, category chips, product grid |
| **Product Details** | Image, price, variant selector, EMI plan selector, Proceed CTA |
| **Confirmation** | Summary of the selected product, variant, price, and EMI plan |

## How to Run

```bash
npm install
npx expo start
```

Then either:
- Press `a` in the terminal to open on a connected Android device/emulator, or
- Scan the QR code with the **Expo Go** app on your Android phone

## Project Structure

See the [Architecture](#architecture) section above — each top-level folder under `src/` has a single responsibility (components are presentation-only, screens own data-fetching, `services/` is the only data-access boundary, `theme/` centralizes all style constants).

## Engineering Decisions

- **Component reusability** — `ProductCard`, `EmiPlanCard`, `VariantSelector`, and the state views are generic and reused across screens instead of being written inline.
- **Mock API architecture** — all data access goes through `services/productApi.ts` so the mock layer can be swapped for a real backend without touching any screen or component.
- **State management** — kept intentionally simple: each screen owns its own `useState`/`useEffect` for the data it needs (no global store), since the flow is a linear wizard and no state needs to be shared across unrelated screens. Selections (variant, EMI plan) are passed forward via navigation route params.
- **Loading/error states** — every async boundary (product list, product details, EMI plans) has its own loading, error-with-retry, and empty state, rather than a single global spinner.
- **Responsive design** — no fixed widths; layouts use Flexbox, `FlatList`/`ScrollView`, and percentage/flex-based sizing so the UI adapts across phone screen sizes.

## Assumptions

- No 1Fi source code, design system, or backend API was provided — this is a **standalone Expo implementation** inspired by the four provided screenshots (Home, Shop – Top Brands, Shop – Nearby Stores, and a "Pay using 1Fi" product screen).
- All product, pricing, and EMI data is mock data, clearly not a real financial calculation.
- Top Brands and Nearby Stores are intentionally left as blank placeholders per the assignment instructions.
- No real authentication, payments, or lending system is implemented.
