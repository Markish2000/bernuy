/**
 * RESERVADO — store de carrito. No implementar hasta activar features.ecommerce.
 * Sugerido: Zustand liviano + persistencia en localStorage.
 *
 * Contrato previsto:
 *   items: CartItem[]
 *   addItem(variantId, qty) / removeItem(variantId) / updateQty(variantId, qty)
 *   total: number
 *   isOpen: boolean / open() / close()
 *
 * Para activarlo: instalar `zustand`, implementar `createCartStore` con
 * `persist`, y conectar CartDrawer/AddToCartButton/CheckoutButton.
 */

export interface CartItem {
  quantity: number;
  variantId: string;
}

export interface CartState {
  isOpen: boolean;
  items: CartItem[];
  total: number;
}

export const INITIAL_CART_STATE: CartState = {
  isOpen: false,
  items: [],
  total: 0,
};
