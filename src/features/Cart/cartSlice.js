import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Initial state as an empty array
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.push(product); // Add the product to the cart array
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state.splice(index, 1); // Remove the product from the cart array
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
