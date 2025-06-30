import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const generateCartItemId = (id, attributes) => {
  if (!attributes) return `${id}`;
  const attrString = Object.entries(attributes)
    .sort()
    .map(([key, val]) => `${key}:${val}`)
    .join("|");
  return `${id}-${attrString}`;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, attributes } = action.payload;
      const cartItemId = generateCartItemId(id, attributes);

      const existing = state.items.find((item) => item.cartItemId === cartItemId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          ...action.payload,
          cartItemId,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (item) item.quantity = quantity;
    },

removeFromCart: (state, action) => {
  const { id, attributes = {} } = action.payload;
  state.items = state.items.filter(
    (item) =>
      item.id !== id ||
      JSON.stringify(item.attributes || {}) !== JSON.stringify(attributes)
  );
},


    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
