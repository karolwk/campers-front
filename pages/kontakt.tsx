import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import { fetchPageData } from '../utils/db/firebase';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import { Container } from '@mui/material';

interface OtherProps {
  appProp: string;
}

const Kontakt: NextPage<OtherProps> = ({ appProp }) => {
  return (
    <Layout
      title="Kampery na wynajem - kontakt"
      description="Wynajem kamperow Wieliczka - kontakt"
    >
      <Container component="section">
        {/* <Image src="/images/background.jpg" alt="dia" layout="fill" /> */}
        {JSON.stringify(appProp)}

        <h1>Kontakt</h1>
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const docSnap = await fetchPageData();
  store.dispatch(setEnt(docSnap.data() as PageDataState));

  return {
    props: {
      appProp: docSnap.data(),
    },
  };
});

export default Kontakt;
