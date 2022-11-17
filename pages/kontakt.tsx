import React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { wrapper } from '../store/store';
import db from '../utils/db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';

interface OtherProps {
  appProp: string;
}

const Kontakt: NextPage<OtherProps> = ({ appProp }) => {
  return (
    <Layout
      title="Kampery na wynajem - kontakt"
      description="Wynajem kamperow Wieliczka - kontakt"
    >
      {/* <Image src="/images/background.jpg" alt="dia" layout="fill" /> */}
      {JSON.stringify(appProp)}

      <h1>Kontakt</h1>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const docRef = doc(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );
  const docSnap = await getDoc(docRef);
  store.dispatch(setEnt(docSnap.data() as PageDataState));

  return {
    props: {
      appProp: docSnap.data(),
    },
  };
});

export default Kontakt;
