import Layout from '../../components/layouts/Layout/Layout';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import db, {
  fetchCampers,
  fetchFBData,
  fetchRefs,
} from '../../utils/db/firebase';
export default function Post() {
  return (
    <Layout title="" description="test">
      <h1>Test</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps() {
  const campersSnapshot = await getDocs(
    collection(db, process.env.FIREBASE_DB_CAMPERS as string)
  );

  // fetching campers data
  const campers = await fetchCampers(campersSnapshot);
}
