import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { PageDataState } from '../shared/types';
import { HYDRATE } from 'next-redux-wrapper';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: PageDataState = {
  logoURL: '',
  email: '',
  phone: '',
  companyName: '',
  companyaddress: '',
  companyZipCode: '',
  companyCity: '',
  facebook: null,
  instagram: null,
  pinterest: null,
  twitter: null,
};

export const pageDataSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setEnt(state, action: PayloadAction<PageDataState>) {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action.payload);
      return {
        ...state,
        ...action.payload.pageData,
      };
    },
  },
});

export const { setEnt } = pageDataSlice.actions;

export default pageDataSlice.reducer;
