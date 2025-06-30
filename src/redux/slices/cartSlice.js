import { createSlice } from "@reduxjs/toolkit";

// Helper: Load cart from localStorage
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
};

// Initial state
const initialState = {
  items: loadCartFromLocalStorage(),
};

// Helper: Create unique cart item ID
const generateCartItemId = (id, attributes) => {
  if (!attributes) return `${id}`;
  const attrString = Object.entries(attributes)
    .sort()
    .map(([key, val]) => `${key}:${val}`)
    .join("|");
  return `${id}-${attrString}`;
};

// Helper: Save cart to localStorage
const saveCartToLocalStorage = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        quantity,
        attributes,
        name,
        slug,
        thumbnail,
        price,
        regular_price,
        sku,
        barcode,
        total_stock_qty,
        merchant,
        promotion,
      } = action.payload;

      const cartItemId = generateCartItemId(id, attributes);

      const existing = state.items.find((item) => item.cartItemId === cartItemId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id,
          slug,
          name,
          thumbnail,
          price,
          regular_price,
          quantity,
          attributes,
          sku,
          barcode,
          total_stock_qty,
          merchant,
          promotion,
          cartItemId,
        });
      }

      saveCartToLocalStorage(state.items);
    },


    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (item) item.quantity = quantity;

      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const { id, attributes = {} } = action.payload;

      state.items = state.items.filter(
        (item) =>
          item.id !== id ||
          JSON.stringify(item.attributes || {}) !== JSON.stringify(attributes)
      );

      saveCartToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage([]);
    },

    // Optional: rehydrate manually
    setCart: (state, action) => {
      state.items = action.payload;
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
