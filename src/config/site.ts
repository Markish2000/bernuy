export const site = {
  name: 'BERNUY',
  url: 'https://bernuy.com.ar',
  email: 'bernuy@bernuy.com.ar',
  social: {
    instagram: 'https://instagram.com/bernuy',
    tiktok: 'https://tiktok.com/@bernuy',
  },
} as const;

/** Flags de funcionalidad. La landing actual no muestra nada de tienda. */
export const features = {
  ecommerce: false, // activa precios, carrito, checkout
  favorites: false,
  i18nExtended: false, // 4 idiomas: es, en, pt, fr
} as const;
