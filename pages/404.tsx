import React from 'react';
import Layout from '../components/layouts/Layout/Layout';
import type { NextPage } from 'next';
import { wrapper } from '../store/store';
import { fetchPageData } from '../utils/db/firebase';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import { Container, Button, Typography } from '@mui/material';

import styles from '../styles/Error404.module.css';
import Link from 'next/link';

type Props = {
  appProp: PageDataState;
};

const Page404: NextPage<Props> = ({ appProp }) => {
  return (
    <Layout
      metaTitle="Kampery na wynajem - 404"
      metaDescription="Nie ma takiej strony."
      pageSubtitle=""
    >
      <Container className={styles.container}>
        <Typography className={styles.title}>404</Typography>
        <Typography className={styles.subtitle}>
          Niestety nie znaleziono strony której szukasz...
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained" size="large" sx={{ marginY: '2rem' }}>
            Powrót do strony głównej
          </Button>
        </Link>
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // Setting data for nav and footer
  const docSnap = await fetchPageData();
  store.dispatch(setEnt(docSnap.data() as PageDataState));

  return {
    props: {
      appProp: docSnap.data(),
    },
  };
});

export default Page404;
