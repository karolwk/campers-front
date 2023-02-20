import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import { fetchPageData } from '../utils/db/firebase';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styles from '../styles/Kontakt.module.css';
import Map from '../components/ui/Map/Map';
import MuiLink from '@mui/material/Link';

interface OtherProps {
  appProp: PageDataState;
}

const Kontakt: NextPage<OtherProps> = ({ appProp }) => {
  const InfoWindowText = () => {
    return (
      <>
        <Typography fontWeight={500} marginBottom="1rem" align="center">
          {appProp.companyName}
        </Typography>

        <Button href="https://goo.gl/maps/kmDoZT4ziohQ6hdY6" variant="outlined">
          Ustaw trasę dojazdu
        </Button>
      </>
    );
  };
  return (
    <Layout
      metaTitle="Kampery na wynajem - kontakt"
      metaDescription="Wynajem kamperow Wieliczka - kontakt"
      pageTitle="Kontakt"
      pageSubtitle="Skontaktuj się z nami - z przyjemnością pomożemy!"
    >
      <Container component="section" sx={{ marginY: '2rem' }}>
        <Grid2 container>
          <Grid2 xs={12} md={6}>
            <Box>
              <Typography fontSize="1.2rem" fontWeight={500}>
                {appProp.companyName}
              </Typography>
              <Typography>{appProp.companyaddress}</Typography>
              <Typography>
                {appProp.companyZipCode + ' ' + appProp.companyCity}
              </Typography>
            </Box>
            <Paper elevation={2} sx={{ border: 'none' }}>
              <Map
                api="s"
                center={{ lat: 49.982276, lng: 20.076053 }}
                infoWindowContent={<InfoWindowText />}
              />
            </Paper>
          </Grid2>
        </Grid2>
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
