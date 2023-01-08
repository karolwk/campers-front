import Layout from '../../components/layouts/Layout/Layout';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { PageDataState } from '../../shared/types';
import { wrapper } from '../../store/store';
import db, {
  fetchCampers,
  fetchFBData,
  fetchRefs,
} from '../../utils/db/firebase';
import { makeURLfromName } from '../../utils/helpers';
import type { NextPage } from 'next';
import { setEnt } from '../../store/pageDataSlice';
interface OtherProps {
  appProp: {};
}

const Kamper: NextPage<OtherProps> = ({ appProp }) => {
  return (
    <Layout title="" description="test">
      <h1> {JSON.stringify(appProp)}</h1>
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
  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const docRef = doc(
        db,
        process.env.FIREBASE_DB_PAGEDATA_COL as string,
        process.env.FIREBASE_DB_PAGEDATA_DOC as string
      );
      const docSnap = await getDoc(docRef);
      store.dispatch(setEnt(docSnap.data() as PageDataState));
      return {
        props: {
          appProp: params,
        },
      };
    }
);

export default Kamper;
