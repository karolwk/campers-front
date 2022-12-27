import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import db, { fetchCampers } from '../utils/db/firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { Camper, PageDataState } from '../shared/types';
import { Container, Typography } from '@mui/material';
import CamperCard from '../components/cards/CamperCard/CamperCard';

interface OtherProps {
  campers: Camper[];
}

const Kampery: NextPage<OtherProps> = ({ campers }) => {
  return (
    <Layout
      title="Kampery na wynajem - oferta"
      description="Wynajem kamperow Wieliczka/Kraków nasza oferta"
    >
      <Container>
        <Typography variant="h2">Nasze kampery</Typography>
        <Typography variant="subtitle1">zapoznaj się z ofertą</Typography>
        {campers.map((camper) => (
          <CamperCard key={camper.name} camper={camper} />
        ))}
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const docRef = doc(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );
  const docSnap = await getDoc(docRef);
  store.dispatch(setEnt(docSnap.data() as PageDataState));

  const campersSnapshot = await getDocs(
    collection(db, process.env.FIREBASE_DB_CAMPERS as string)
  );

  const campers = await fetchCampers(campersSnapshot);

  return {
    props: {
      appProp: campers,
    },
  };
});

export default Kampery;
