import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import footerReducer from './footerSlice';
import { createWrapper } from 'next-redux-wrapper';
import { localApi } from '../services/localApi';
import { pageSettingsApi } from '../services/pageSettingsApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      [localApi.reducerPath]: localApi.reducer,
      [pageSettingsApi.reducerPath]: pageSettingsApi.reducer,
      footer: footerReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        localApi.middleware,
        pageSettingsApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
