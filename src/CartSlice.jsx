import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Extract plant details from action payload
      const existingItem = state.items.find(item => item.name === name); // Check if the item already exists in the cart
      if (existingItem) {
        existingItem.quantity++; // Increment the quantity if the item already exists
      } else {
        state.items.push({ name, image, cost, quantity: 1 }); // Add a new item to the cart
      }
    },

    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const { name } = action.payload; // Extract the name of the item to remove
      state.items = state.items.filter(item => item.name !== name); // Remove the item from the cart
    },

    // Reducer to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract the item's name and new quantity
      const item = state.items.find(item => item.name === name); // Find the item in the cart
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity; // Update the item's quantity if greater than 0
        } else {
          // Remove the item if quantity is set to 0
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Export action creators to use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as the default to use in store.js
export default CartSlice.reducer;