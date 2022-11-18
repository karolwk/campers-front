import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import localApiReducer from './localApiDataSlice';
import { createWrapper } from 'next-redux-wrapper';
import { localApi } from '../services/localApi';
import { firebaseApi } from '../services/firebaseApi';
import { pageDataSlice } from './pageDataSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [localApi.reducerPath]: localApi.reducer,
      [pageDataSlice.name]: pageDataSlice.reducer,
      headersData: localApiReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
