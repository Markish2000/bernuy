import type { CartItem } from './cart-item.interface';

export interface CartState {
  isOpen: boolean;
  items: CartItem[];
  total: number;
}
