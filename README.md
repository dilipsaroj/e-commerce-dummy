# Nua Store

Production-quality React 18 + TypeScript e-commerce assignment built with Vite, Redux Toolkit, React Router, and SCSS Modules.

## Setup

1. Use Node 18+.
2. Install dependencies with `npm install`.
3. Start the app with `npm run dev`.
4. Create a production build with `npm run build`.
5. Run tests with `npm test`.

## Highlights

- Product listing page powered by the Fake Store API
- Product detail page with image gallery, deep-linkable variants, stock states, and quantity controls
- Redux Toolkit store limited to `cart` and `ui`, with cart persistence through `localStorage`
- Lazy-loaded routes, memoized product cards, and lazy-loaded product imagery
- Unit tests for variant selection, sold-out state, quantity limits, and cart reducer behavior

## Architecture

- `src/app`: Redux store setup
- `src/components`: reusable UI and commerce components
- `src/features`: cart and UI state slices, selectors, and persistence
- `src/hooks`: shared React hooks for data, quantity, cart actions, and URL variant sync
- `src/pages`: route-level screens
- `src/router`: app layout and route definitions
- `src/services`: API and transformation layer
- `src/styles`: global styling tokens and resets
- `src/test`: shared test fixtures and setup
- `src/types`: domain and API typing
- `src/utils`: currency, stock, and variant helpers

## Trade-offs

- Variant imagery is deterministically derived from the Fake Store image because the API does not supply real galleries.
- Product data stays outside Redux to keep the store aligned with the assignment and avoid unnecessary global caching.
- Deployment is intentionally left manual so you can review and ship the final version yourself.

## App-link
- https://commerce-dummy.vercel.app/