import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showNotification } from "./notificationSlice";

const initialState = {
  items: [],
  isVisible: false,
};

// createAsyncThunk for sending cart data
export const sendCartData = createAsyncThunk(
  "cart/sendCartData",
  async (items, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      const response = await fetch(
        "https://crudcrud.com/api/374f5f7d68934e64aa18767ac4e208fa/cart",
        {
          method: "POST",
          body: JSON.stringify({ items }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send cart data!");
      }

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );

      return await response.json();
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload;
    },
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    // ✅ Add this reducer
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCartData.fulfilled, (state, action) => {
        console.log("Cart data sent successfully:", action.payload);
      })
      .addCase(sendCartData.rejected, (state, action) => {
        console.error("Sending cart data failed:", action.payload);
      });
  },
});

export const {
  replaceCart,
  toggleCart,
  addItemToCart,
  removeItemFromCart, 
} = cartSlice.actions;

export default cartSlice.reducer;
