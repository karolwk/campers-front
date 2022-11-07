import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { FooterState } from '../shared/types';
import { localApi } from '../services/localApi';

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

export const counterSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      localApi.endpoints.getHeaders.matchFulfilled,
      (state, { payload }) => {
        state = _.merge(payload, state);
      }
    );
  },
});

export default counterSlice.reducer;
