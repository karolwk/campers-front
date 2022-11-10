// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FooterState } from '../shared/types';

// Define a service using a base URL and expected endpoints
export const localApi = createApi({
  reducerPath: 'footerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getHeaders: builder.query<FooterState, null>({
      query: () => `/headers`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHeadersQuery } = localApi;
