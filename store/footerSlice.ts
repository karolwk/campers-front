import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import _ from 'lodash';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a type for the slice state
interface FooterState {
  logoURL: string;
  email: string;
  phone: string;
  companyName: string;
  companyaddress: string;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
}

// Define the initial state using that type
const initialState: FooterState = {
  logoURL: '',
  email: '',
  phone: '',
  companyName: '',
  companyaddress: '',
  facebook: null,
  instagram: null,
  pinterest: null,
  twitter: null,
};

// Define a service using a base URL and expected endpoints
export const footerApi = createApi({
  reducerPath: 'footerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/headers' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = footerApi;

export const counterSlice = createSlice({
  name: 'footer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      footerApi.endpoints.getShortedData.matchFulfilled,
      (state, { payload }) => {
        if (state.domains.length > 2) state.domains.pop();
        state.domains.unshift(payload);
      }
    );
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
