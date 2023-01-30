import Layout from '../../components/layouts/Layout/Layout';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Camper, PageDataState } from '../../shared/types';
import { wrapper } from '../../store/store';
import db, { fetchCampers, fetchPageData } from '../../utils/db/firebase';
import { formatPathtoGCS, makeURLfromName } from '../../utils/helpers';
import type { NextPage } from 'next';
import { setEnt } from '../../store/pageDataSlice';
import { Box, Container, Typography, Divider } from '@mui/material';
import Image from 'next/image';
import Carousel from '../../components/ui/Carousel/Carousel';
import styles from '../../styles/KamperDetails.module.css';
import ListWithIcon from '../../components/ui/ListWithIcon/ListWithIcon';
import PriceCard from '../../components/cards/PriceCard/PriceCard';
interface OtherProps {
  appProp: Camper;
}

const carouselImages = (images: string[]) => {
  return images.map((image) => (
    <Image
      key={image}
      src={formatPathtoGCS(image)}
      alt="Gallery image"
      layout="fill"
      objectFit="cover"
    />
  ));
};

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
      <Container>
        <Box sx={{ display: 'flex', direction: 'row' }}>
          <Box sx={{ maxWidth: '500px' }}>
            <Carousel items={carouselImages(appProp.images)} />
          </Box>
          <Box>
            <Box
              className={styles.camperDetailsBox}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Typography>{appProp.name}</Typography>
              <Typography>{appProp.location}</Typography>
              <Divider light />
              <ListWithIcon items={appProp.mainAmenities} />
              <Divider light />
              <Typography>Cennik:</Typography>
              {appProp.price.map((price) => (
                <PriceCard key={price.season} price={price} />
              ))}
              <Typography>{appProp.additionalPriceInfo}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
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
