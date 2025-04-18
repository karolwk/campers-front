import Layout from '../../components/layouts/Layout/Layout';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Camper, PageDataState } from '../../shared/types';
import { wrapper } from '../../store/store';
import db, {
  fetchCampersWithRefs,
  fetchPageData,
} from '../../utils/db/firebase';
import { formatPathtoGCS, makeURLfromName } from '../../utils/helpers';
import type { NextPage } from 'next';
import { setEnt } from '../../store/pageDataSlice';
import { Box, Container, Typography, Divider, Paper } from '@mui/material';
import Image from 'next/image';
import Carousel from '../../components/ui/Carousel/Carousel';
import styles from '../../styles/KamperDetails.module.css';
import ListWithIcon from '../../components/ui/ListWithIcon/ListWithIcon';
import PriceCard from '../../components/cards/PriceCard/PriceCard';
import ReactMarkdown from 'react-markdown';
import ListOfAmenities from '../../components/ui/ListOfAmenities/ListOfAmenities';
import TechnicalTable from '../../components/tables/TechnicalTable/TechnicalTable';

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
      objectFit="contain"
      loading="lazy"
    />
  ));
};

const Kamper: NextPage<OtherProps> = ({ appProp }) => {
  if (!appProp) {
    return (
      <Layout metaTitle="Camper not found" metaDescription="no data">
        <h3>No data please return to main page</h3>
      </Layout>
    );
  }

  return (
    <Layout
      metaTitle={appProp.metaTitle}
      metaDescription={appProp.metaDescription}
    >
      <Container>
        <Box component="section" className={styles.camperDetailsSection}>
          <Box className={styles.galleryBox}>
            <Carousel items={carouselImages(appProp.images)} />
          </Box>
          <Box className={styles.camperDetailsWraper}>
            <Paper className={styles.camperDetailsBox} elevation={3}>
              <Typography fontWeight={'bold'}>{appProp.name}</Typography>
              <Typography>{appProp.location}</Typography>
              <Divider light />
              <ListWithIcon items={appProp.mainAmenities} shorter />
              <Divider light />
              <Typography>Cennik:</Typography>
              {appProp.price.map((price) => (
                <PriceCard key={price.sesons + price} price={price} />
              ))}
              <Typography>{appProp.additionalPriceInfo}</Typography>
            </Paper>
          </Box>
        </Box>
        <Box component="section" className={styles.contentSection}>
          <Box className={styles.contentRow}>
            <Typography variant="h1" align="center">
              {appProp.name}
            </Typography>

            <ReactMarkdown>{appProp.description}</ReactMarkdown>
            <ListOfAmenities
              title="Wyposażenie"
              amenities={appProp.genericAmenities}
              className={styles.amenitiesBox}
            />
            <ListOfAmenities
              title="Kuchnia"
              amenities={appProp.kitchenAmenities}
              className={styles.amenitiesBox}
            />
            <ListOfAmenities
              title="Część użytkowa"
              amenities={appProp.usableAmenities}
              className={styles.amenitiesBox}
            />
            <ListOfAmenities
              title="Akcesoria dodatkowe"
              amenities={appProp.additionalEquipment}
              className={styles.amenitiesBox}
            />
            {!!appProp.priceInfo && (
              <Typography marginY="2rem">{appProp.priceInfo}</Typography>
            )}
            <TechnicalTable technicals={appProp.technicals} />
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
  campersSnapshot.forEach((doc) => {
    const { name, isPublished } = doc.data();
    isPublished &&
      paths.push({
        params: { id: makeURLfromName(name) },
      });
  });

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
      if (params) {
        const camperRef = collection(
          db,
          process.env.FIREBASE_DB_CAMPERS as string
        );
        // Query to find specific camper based on params.id
        const q = query(camperRef, where('urlSlug', '==', params.id));
        const querySnapshot = await getDocs(q);
        appProps = await fetchCampersWithRefs(querySnapshot);
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
