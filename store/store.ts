import { configureStore } from '@reduxjs/toolkit';
import footerReducer from './footerSlice';

export const store = configureStore({
  reducer: {
    footer: footerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
