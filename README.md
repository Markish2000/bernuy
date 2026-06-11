# BERNUY · Landing premium de perfumería

Landing editorial oscura para la casa de perfumería de lujo **BERNUY**, construida según el handoff de diseño (`design_handoff_bernuy/`). Frontend puro con arquitectura preparada para evolucionar a ecommerce.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** strict
- **Tailwind CSS 3** con tokens por CSS variables (`darkMode: 'class'`)
- **GSAP + ScrollTrigger** (`@gsap/react`) para reveals y solidificación de nav
- **Framer Motion** solo para microinteracciones (menú mobile, dropdown de idioma)
- **next-intl** para i18n (21 locales)
- `next/image` + `next/font` (Cormorant Garamond + Jost)

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción (SSG)
npm run start    # servir el build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

## Estructura

```
src/
├── app/[locale]/         layout + landing + fragancias/[slug]
├── app/sitemap.ts, robots.ts
├── components/
│   ├── layout/           AppHeader, AppFooter, Logo, MobileMenu
│   ├── sections/         Hero, EditorialBlock, FragranceCollection, FragranceDetail, …
│   ├── ui/               SectionTitle, FragranceCard, NoteCard, ThemeToggle, LanguageSwitcher
│   ├── animations/       ScrollReveal, AnimatedTextReveal, FloatingBottle, ScrollProgressIndicator
│   ├── ecommerce/        STUBS tipados (detrás de features.ecommerce)
│   ├── providers/        ThemeProvider (dark/light, anti-flash, localStorage)
│   └── seo/              JsonLd
├── config/               site.ts (flags), navigation.ts
├── data/                 products.ts (mock 6 fragancias), editorial.ts
├── i18n/                 routing, request (fallback en cascada), navigation
├── lib/                  products.ts (capa mock→API), seo.ts, utils.ts
├── store/                cart.ts (RESERVADO)
├── styles/               globals, tokens (CSS vars dark/light), keyframes
└── types/                product.ts
messages/                 es.json (base) + 18 es-XX (overrides) + pt-BR + en-US
public/assets/            brand · products/<slug> · editorial · og
```

## i18n

- `defaultLocale: 'es-AR'`, `localePrefix: 'as-needed'`.
- `messages/es.json` tiene **todo** el copy en español. Cada `es-XX.json` arranca con overrides mínimos (moneda) y hereda de `es` vía fallback en cascada (`i18n/request.ts`).
- `pt-BR.json` y `en-US.json` traducidos. Ningún texto visible está hardcodeado.

## Qué queda preparado para ecommerce

- **Tipos firmes** (`types/product.ts`): `Product`, `ProductVariant`, `OlfactoryNote`, `ProductImage`.
- **Capa de datos aislada** (`lib/products.ts`): `getAllProducts` / `getProductBySlug` / `getFeaturedProducts`. **Migrar a API = reescribir solo este archivo** (cambiar el mock por `fetch`), sin tocar UI.
- **Componentes stub** (`components/ecommerce/`): `ProductGrid`, `ProductCard`, `ProductDetail`, `AddToCartButton`, `QuantitySelector`, `VariantSelector`, `CartDrawer`, `CheckoutButton`, `FavoriteButton`, `PriceTag`. No se montan en la UI actual.
- **Feature flags** (`config/site.ts`): `ecommerce`, `favorites`, `i18nExtended`. Activar `ecommerce` habilita precios/carrito.
- **Store reservado** (`store/cart.ts`): contrato previsto, sin implementar. Para activarlo: instalar `zustand`, implementar el store con `persist` y conectar `CartDrawer`/`AddToCartButton`/`CheckoutButton`.

## Notas de fidelidad

- Tokens de color/tipografía/sombras tomados textualmente de `01-design-system.md` (dark nativo, light como adaptación).
- Animaciones con los keyframes exactos (`titleSweep` 6.5s, `floatBottle` 7s, `bobArrow`); reveals con ScrollTrigger. Todo respeta `prefers-reduced-motion` y se simplifica en mobile.
- Las imágenes se sirven como PNG y `next/image` las entrega en AVIF/WebP en runtime (`images.formats`), cumpliendo el objetivo de `07-assets.md` sin paso de conversión.
- El copy de producto vive en `messages.products.<slug>` (decisión i18n: ningún texto visible hardcodeado), referenciado por keys desde `data/products.ts`.
