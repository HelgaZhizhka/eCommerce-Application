import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Cart } from '@commercetools/platform-sdk';

import { createCart, deleteCart, getActiveCart, updateCart } from '../services/cartService';
import { getCartProducts } from '../stores/cartHelpers';
import { ProductType } from '../stores/Store.types';
import { hasSession } from '../services/session';
import { promoCode } from '../constants';
import { notify } from './notifications';

export const cartKey = ['cart'] as const;

type CartView = {
  cart: Cart | null;
  products: ProductType[];
  totalAmount: number;
  totalPrice: number;
  discount: { name: string; id: string } | null;
};

const emptyView: CartView = { cart: null, products: [], totalAmount: 0, totalPrice: 0, discount: null };

const deriveView = (cart: Cart | null): CartView =>
  cart
    ? {
        cart,
        products: getCartProducts([...cart.lineItems]),
        totalAmount: cart.totalLineItemQuantity ?? 0,
        totalPrice: cart.totalPrice.centAmount,
        discount:
          cart.discountCodes.length > 0 ? { name: promoCode, id: cart.discountCodes[0]!.discountCode.id } : null,
      }
    : emptyView;

export const useCartQuery = (): CartView & { isLoading: boolean } => {
  const { data, isLoading } = useQuery({
    queryKey: cartKey,
    queryFn: getActiveCart,
    enabled: hasSession(),
    select: deriveView,
  });
  return { ...(data ?? emptyView), isLoading };
};

const useCartMutation = <TArgs>(
  run: (cart: Cart | null, args: TArgs) => Promise<Cart | null>,
  messages: { success: string; error: string }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: TArgs) => {
      const cached = queryClient.getQueryData<Cart | null>(cartKey) ?? null;
      return run(cached, args);
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKey, cart);
      notify({ type: 'success', message: messages.success });
    },
    onError: () => {
      notify({ type: 'error', message: messages.error });
    },
  });
};

export const useAddToCartMutation = () =>
  useCartMutation(
    async (cart, { productId, quantity, variantId }: { productId: string; quantity?: number; variantId?: number }) => {
      const target = cart ?? (await createCart());
      return updateCart(target, [{ action: 'addLineItem', productId, quantity, variantId }]);
    },
    { success: 'Product added to cart successfully', error: 'Error adding product to cart' }
  );

export const useRemoveLineItemMutation = () =>
  useCartMutation(
    async (cart, lineItemId: string) => {
      if (!cart) return cart;
      return updateCart(cart, [{ action: 'changeLineItemQuantity', lineItemId, quantity: 0 }]);
    },
    { success: 'Product removed from cart successfully', error: 'Error remove product from cart' }
  );

export const useChangeQuantityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lineItemId, quantity }: { lineItemId: string; quantity: number }) => {
      const cart = queryClient.getQueryData<Cart | null>(cartKey);
      if (!cart) return Promise.resolve(null);
      return updateCart(cart, [{ action: 'changeLineItemQuantity', lineItemId, quantity }]);
    },
    onSuccess: (cart) => queryClient.setQueryData(cartKey, cart),
    onError: () => notify({ type: 'error', message: 'Error get cart' }),
  });
};

export const useClearCartMutation = () =>
  useCartMutation(
    async (cart) => {
      if (cart) await deleteCart(cart);
      return null;
    },
    { success: 'All products removed from cart successfully', error: 'Error delete all products from cart' }
  );

export const useApplyPromoMutation = () =>
  useCartMutation(
    async (cart, code: string) => {
      if (!cart) return cart;
      return updateCart(cart, [{ action: 'addDiscountCode', code }]);
    },
    { success: 'Promo code successfully applied', error: 'Error adding promo code' }
  );

export const useRemovePromoMutation = () =>
  useCartMutation(
    async (cart, discountId: string) => {
      if (!cart) return cart;
      return updateCart(cart, [
        { action: 'removeDiscountCode', discountCode: { typeId: 'discount-code', id: discountId } },
      ]);
    },
    { success: 'Promo code successfully removed', error: 'Error removing promo code' }
  );

// Store-signature facade so Card / CurrentProduct keep their call shape.
export const useCartActions = (): {
  addToCart: (sku: string, productId: string, quantity?: number, variantId?: number) => Promise<void>;
  isProductInCart: (sku: string) => boolean;
  removeProductFromCart: (sku: string) => Promise<void>;
} => {
  const { products } = useCartQuery();
  const addMutation = useAddToCartMutation();
  const removeMutation = useRemoveLineItemMutation();

  return {
    addToCart: async (sku, productId, quantity, variantId) => {
      await addMutation.mutateAsync({ productId, quantity, variantId });
    },
    isProductInCart: (sku) => products.some((item) => item.variants[0]?.sku === sku),
    removeProductFromCart: async (sku) => {
      const lineItemId = products.find((item) => item.variants[0]?.sku === sku)?.lineItemId;
      if (lineItemId) await removeMutation.mutateAsync(lineItemId);
    },
  };
};
