import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
  isVisible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
    addToCart(state, action) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },
  },
});

export const { toggleCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
