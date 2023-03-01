import React, { useMemo } from 'react';
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
import ContactForm from '../components/forms/ContactForm/ContactForm';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import MapInfoWindow from '../components/ui/MapInfoWindow/MapInfoWindow';
import ContactInfo from '../components/ui/ContactInfo/ContactInfo';

interface OtherProps {
  appProp: PageDataState;
}

const Kontakt: NextPage<OtherProps> = ({ appProp }) => {
  return (
    <Layout
      metaTitle="Kampery na wynajem - kontakt"
      metaDescription="Wynajem kamperow Wieliczka - kontakt"
      pageTitle="Kontakt"
      pageSubtitle="Skontaktuj się z nami - z przyjemnością pomożemy!"
    >
      <Container component="section" sx={{ marginY: '2rem' }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={6}>
            <ContactInfo
              companyName={appProp.companyName}
              companyAddress={appProp.companyaddress}
              zipCode={appProp.companyZipCode}
              city={appProp.companyCity}
              email={appProp.email}
              phone={appProp.phone}
            />

            <Paper elevation={2} sx={{ border: 'none' }}>
              <Map
                api={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}
                center={{ lat: 49.982276, lng: 20.076053 }}
                infoWindowContent={
                  <MapInfoWindow companyName={appProp.companyName} />
                }
              />
            </Paper>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GoogleReCaptchaProvider
              reCaptchaKey={
                process.env.NEXT_PUBLIC_CLIENT_RECAPTACHA_API as string
              }
            >
              <ContactForm />
            </GoogleReCaptchaProvider>
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
