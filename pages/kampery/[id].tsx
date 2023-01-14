import Layout from '../../components/layouts/Layout/Layout';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Camper, PageDataState } from '../../shared/types';
import { wrapper } from '../../store/store';
import db, { fetchCampers, fetchPageData } from '../../utils/db/firebase';
import { makeURLfromName } from '../../utils/helpers';
import type { NextPage } from 'next';
import { setEnt } from '../../store/pageDataSlice';

interface OtherProps {
  appProp: Camper;
}

const Kamper: NextPage<OtherProps> = ({ appProp }) => {
  if (!appProp) {
    return (
      <Layout title="Camper not found" description="no data">
        <h3>No data please return to main page</h3>
      </Layout>
    );
  }
  return (
    <Layout title={appProp.name} description={appProp.description}>
      <h3> {JSON.stringify(appProp)}</h3>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Return a list of possible value for id
  const campersSnapshot = await getDocs(
    collection(db, process.env.FIREBASE_DB_CAMPERS as string)
  );
  const paths = [] as any;
  campersSnapshot.forEach((doc) =>
    paths.push({
      params: { id: makeURLfromName(doc.data().name), kamperId: doc.id },
    })
  );

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      let appProps;

      const docSnap = await fetchPageData();
      store.dispatch(setEnt(docSnap.data() as PageDataState));

      const camperRef = collection(
        db,
        process.env.FIREBASE_DB_CAMPERS as string
      );
      if (params) {
        const q = query(camperRef, where('urlSlug', '==', params.id));
        const querySnapshot = await getDocs(q);
        appProps = await fetchCampers(querySnapshot);
        appProps = appProps.pop();
      }

      return {
        props: {
          appProp: appProps,
        },
      };
    }
);

export default Kamper;
