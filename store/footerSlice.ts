import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { FooterState } from '../shared/types';
import { localApi } from '../services/localApi';

const initialState: FooterState = {
  logoURL: '',
  email: '',
  phone: '',
  companyName: 'dd',
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
        // console.log(state.companyName);
        // state = _.merge(payload, state);
        // console.log(state);
        for (let key in state) {
          //@ts-ignore
          state[key] = payload[key];
        }
      }
    );
  },
});

export default counterSlice.reducer;
