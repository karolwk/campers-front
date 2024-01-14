import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import db, { fetchPageData } from '../utils/db/firebase';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState, StatutPage } from '../shared/types';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from '../styles/Kontakt.module.css';
import Map from '../components/ui/Map/Map';
import ContactForm from '../components/forms/ContactForm/ContactForm';
import { doc, getDoc } from 'firebase/firestore';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import MapInfoWindow from '../components/ui/MapInfoWindow/MapInfoWindow';
import ContactInfo from '../components/ui/ContactInfo/ContactInfo';

interface OtherProps {
  appProp: PageDataState;
  privacyData: StatutPage;
}

const Kontakt: NextPage<OtherProps> = ({ appProp, privacyData }) => {
  return (
    <Layout
      metaTitle="Wynajem kamperów Kraków  - kontakt"
      metaDescription="Wynajem kamperów w Krakowie - odkryj piękno Polski na własnej drodze! Skontaktuj się z nami, aby wynająć kamper już dziś i zacząć niezapomnianą przygodę."
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
              <ContactForm privacyContent={privacyData.mainContent} />
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
  const docRef = doc(
    db,
    process.env.PRIVACY_DB as string,
    process.env.PRIVACY_DB_DOC as string
  );
  const privacySnapshot = await getDoc(docRef);

  return {
    props: {
      appProp: docSnap.data(),
      privacyData: privacySnapshot.data(),
    },
  };
});

export default Kontakt;
