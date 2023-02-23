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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Animate } from '../components/animations/Animate/Animate';
interface OtherProps {
  campers: Camper[];
}

const Kampery: NextPage<OtherProps> = ({ campers }) => {
  return (
    <Layout
      metaTitle="Kampery na wynajem - oferta"
      metaDescription="Wynajem kamperow Wieliczka/Kraków nasza oferta"
    >
      <Container>
        <Box className={styles.camperboxHeader}>
          <Typography variant="h2" fontWeight={500}>
            Nasze kampery
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Nasze kampery są w pełni wyposażone, łatwe w obsłudze i idealne na
            kempingowe wyjazdy. Od spokojnego weekendu po eksplorowanie Europy,
            możliwości są nieograniczone!
          </Typography>
        </Box>
        <Grid2 container spacing={5} marginY="2rem">
          {campers.map((camper, index) => (
            <Grid2 key={camper.name} xs={12} sm={6} md={4}>
              <Animate.SlideFromRihght
                component={Box}
                transition="all 1s "
                transitionDelay={
                  index < 9 ? `${index * 100 + 100}ms` : '1000ms'
                }
                height="100%"
              >
                <CamperCard camper={camper} />
              </Animate.SlideFromRihght>
            </Grid2>
          ))}
        </Grid2>
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
