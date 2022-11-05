import { configureStore } from '@reduxjs/toolkit';
import footerReducer from './footerSlice';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    footer: footerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
