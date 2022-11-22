import type { NextPage } from 'next';

import Image from 'next/image';
import Layout from '../components/Layout/Layout';

import { wrapper } from '../store/store';
import db, { fetchFBData } from '../utils/db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import { Container } from '@mui/material';

const Home: NextPage = () => {
  return (
    <Layout title="Kampery na wynajem" description="Wynajem kamperow Wieliczka">
      {/* <Image src="/images/background.jpg" alt="dia" layout="fill" /> */}
      <Container component="section">
        {[...new Array(122)]
          .map((ele) => {
            return 'Nam provident pariatur pariatur amet vero. Et consequatur modi ut molestiae assumenda voluptas numquam doloremque. Et reprehenderit nostrum quisquam nisi ipsum tempore.';
          })
          .join('\n')}
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const dupa = process.env.FIREBASE_DB_PAGEDATA_COL;
  const docSnap = await fetchFBData<PageDataState>(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );

  store.dispatch(setEnt(docSnap as PageDataState));

  return {
    props: {
      appProp: docSnap,
    },
  };
});

export default Home;
