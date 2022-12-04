import type { NextPage } from 'next';

import Image from 'next/image';
import Layout from '../components/Layout/Layout';

import { wrapper } from '../store/store';
import db, { fetchFBData } from '../utils/db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import { Box, Container, Typography } from '@mui/material';
import { ref } from 'firebase/storage';

type HomeProps = {
  mainPage: {};
};

const Home: NextPage = () => {
  return (
    <Layout title="Kampery na wynajem" description="Wynajem kamperow Wieliczka">
      <Box sx={{ position: 'relative', minHeight: '40vw' }}>
        <Image
          src="/images/background.jpg"
          alt="dia"
          layout="fill"
          objectFit="cover"
        />
        <Typography
          variant="h1"
          sx={{
            zIndex: '1000',
            fontSize: '2rem',
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            bottom: '30%',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          Wynajmnij kampera
        </Typography>
      </Box>
      <Container component="section">
        {[...new Array(22)]
          .map((ele) => {
            return 'Nam provident pariatur pariatur amet vero. Et consequatur modi ut molestiae assumenda voluptas numquam doloremque. Et reprehenderit nostrum quisquam nisi ipsum tempore.';
          })
          .join('\n')}
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const docSnap = await fetchFBData<PageDataState>(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );

  const docMainPage = doc(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );
  const docMainPageSnap = await getDoc(docMainPage);

  store.dispatch(setEnt(docSnap as PageDataState));

  return {
    props: {
      appProp: docSnap,
      mainPage: docMainPageSnap.data(),
    },
  };
});

export default Home;
