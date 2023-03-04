import React from 'react';
import Layout from '../components/layouts/Layout/Layout';
import type { NextPage } from 'next';
import { wrapper } from '../store/store';
import { fetchPageData } from '../utils/db/firebase';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState, StatutPage } from '../shared/types';
import { Container, Box } from '@mui/material';
import db from '../utils/db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import FaqAccordion from '../components/ui/FaqAccordion/FaqAccordion';

type Props = {
  appProp: StatutPage;
};

const WarunkiWynajmu: NextPage<Props> = ({ appProp }) => {
  return (
    <Layout
      metaTitle={appProp.metaTitle}
      metaDescription={appProp.metaDescription}
      pageTitle={appProp.pagetitle}
      pageSubtitle={appProp.pageSubtitle}
    >
      <Container>
        <ReactMarkdown>{appProp.mainContent}</ReactMarkdown>
        <Box>
          <FaqAccordion faq={appProp.faq} />
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // Setting data for nav and footer
  const docSnap = await fetchPageData();
  store.dispatch(setEnt(docSnap.data() as PageDataState));
  const ref = doc(
    db,
    process.env.WARUNKI_DB as string,
    process.env.WARUNKI_DB_DOC as string
  );
  const statuSnapshot = await getDoc(ref);

  return {
    props: {
      appProp: statuSnapshot.data(),
    },
  };
});

export default WarunkiWynajmu;
