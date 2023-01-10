import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import db, { fetchCampers, fetchPageData } from '../utils/db/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { Camper, PageDataState } from '../shared/types';
import { Box, Container, Typography } from '@mui/material';
import CamperCard from '../components/cards/CamperCard/CamperCard';
import styles from '../styles/Kampery.module.css';
interface OtherProps {
  campers: Camper[];
}

const Kampery: NextPage<OtherProps> = ({ campers }) => {
  console.log(campers);
  return (
    <Layout
      title="Kampery na wynajem - oferta"
      description="Wynajem kamperow Wieliczka/Kraków nasza oferta"
    >
      <Container>
        <Box className={styles.camperboxHeader}>
          <Typography variant="h2">Nasze kampery</Typography>
          <Typography variant="subtitle1">
            Nasze kampery są w pełni wyposażone, łatwe w obsłudze i idealne na
            kempingowe wyjazdy. Od spokojnego weekendu po eksplorowanie Europy,
            możliwości są nieograniczone!
          </Typography>
        </Box>
        <Box className={styles.camperboxMain}>
          {campers.map((camper) => (
            <>
              <CamperCard key={camper.name} camper={camper} />
              <CamperCard key={camper.name + '1'} camper={camper} />
              <CamperCard key={camper.name + '2'} camper={camper} />
              <CamperCard key={camper.name + '3'} camper={camper} />
            </>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const docSnap = await fetchPageData();
  store.dispatch(setEnt(docSnap.data() as PageDataState));

  const campersSnapshot = await getDocs(
    collection(db, process.env.FIREBASE_DB_CAMPERS as string)
  );

  const campers = await fetchCampers(campersSnapshot);

  return {
    props: {
      campers: campers,
    },
  };
});

export default Kampery;
