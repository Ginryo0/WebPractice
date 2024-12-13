import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // default middleware = array of middleware
  middleware: (getDefaultMiddleware) =>
    // apiSlice middleware => manages caching life time
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
