import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import db from '../utils/db/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const firebaseApi = createApi({
  reducerPath: 'pageSettings',
  // using fakeBaseQuery because firebase hase own library to put, get, post data
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Settings'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchPageData: builder.query({
      async queryFn() {
        try {
          const docRef = doc(
            db,
            process.env.FIREBASE_DB_PAGEDATA_COL as string,
            process.env.FIREBASE_DB_PAGEDATA_DOC as string
          );
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data());
          return { data: docSnap.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Settings'],
    }),
  }),
});

export const { useFetchPageDataQuery } = firebaseApi;
