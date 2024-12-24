// Importing the configureStore function from Redux Toolkit to create the Redux store
import { configureStore } from '@reduxjs/toolkit';

// Importing the cartReducer from the CartSlice.js file to manage the "cart" slice of the state
import cartReducer from './CartSlice';

// Configuring the Redux store
// The reducer object specifies the state slices and their corresponding reducers
const store = configureStore({
  reducer: {
    cart: cartReducer, // The "cart" slice of state is managed by cartReducer
  },
});

// Exporting the configured store to be used throughout the application
export default store;