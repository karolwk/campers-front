import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { wrapper } from '../store/store';
import { useFetchPageDataQuery } from '../services/pageSettingsApi';

const Kontakt: NextPage = () => {
  return (
    <Layout
      title="Kampery na wynajem - kontakt"
      description="Wynajem kamperow Wieliczka - kontakt"
    >
      {/* <Image src="/images/background.jpg" alt="dia" layout="fill" /> */}
      {}

      <h1>Kontakt</h1>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { data } = useFetchPageDataQuery(null);

  console.log('State on server', store.getState());
  console.log(data);

  return {
    props: {
      data,
    },
  };
});

export default Kontakt;
