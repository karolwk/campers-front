import React from 'react';
import Layout from '../components/layouts/Layout/Layout';
import type { NextPage } from 'next';
import { wrapper } from '../store/store';
import db, { fetchPageData } from '../utils/db/firebase';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState, PrivacyPage } from '../shared/types';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Box, Typography } from '@mui/material';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
type Props = {
  appProp: PrivacyPage;
};

const PolitykaPrywatnosci: NextPage<Props> = ({ appProp }) => {
  return (
    <Layout
      metaTitle={appProp.metaTitle}
      metaDescription={appProp.metaDescription}
      pageTitle={appProp.pagetitle}
      pageSubtitle={appProp.pageSubtitle}
    >
      <Container>
        <ReactMarkdown>{appProp.mainContent}</ReactMarkdown>
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // Setting data for nav and footer
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
      appProp: privacySnapshot.data(),
    },
  };
});

export default PolitykaPrywatnosci;
