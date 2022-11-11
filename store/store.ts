import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import footerReducer from './footerSlice';

import { localApi } from '../services/localApi';

export const store = configureStore({
  reducer: {
    [localApi.reducerPath]: localApi.reducer,
    footer: footerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
