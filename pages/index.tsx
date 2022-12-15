import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import db, { fetchFBData, fetchRefs } from '../utils/db/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import styles from '../styles/Home.module.css';
import { MainPageData, Camper } from '../shared/types';
import IconCard from '../components/cards/IconCard/IconCard';
import ReactMarkdown from 'react-markdown';
import CamperCard from '../components/cards/CamperCard/CamperCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FaqAccordion from '../components/ui/FaqAccordion/FaqAccordion';

type HomeProps = {
  mainPage: MainPageData;
  campers: Camper[];
};

const Home: NextPage<HomeProps> = ({ campers, mainPage }) => {
  console.log(campers);
  return (
    <Layout title="Kampery na wynajem" description="Wynajem kamperow Wieliczka">
      <Box sx={{ position: 'relative', minHeight: '40vw' }}>
        <Image
          src="/images/background.jpg"
          alt="dia"
          layout="fill"
          objectFit="cover"
        />
        <Typography
          variant="h1"
          sx={{
            zIndex: '1000',
            fontSize: '2rem',
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            bottom: '30%',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          Wynajmnij kampera
        </Typography>
      </Box>

      <Container component="section">
        <Typography variant="h2">Dlaczego my</Typography>
        <Box className={styles.icons}>
          {mainPage.icons.map((icon) => {
            return (
              <IconCard
                key={icon.title}
                iconURL={icon.iconURL}
                iconTitle={icon.title}
                iconDescription={icon.description}
              />
            );
          })}
        </Box>
      </Container>
      <Box sx={{ backgroundColor: '#EEF2E6' }}>
        <Container component="section">
          <Typography variant="h2">{mainPage.teaserTitle}</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',

              gap: '100px',
            }}
          >
            <Image
              src="/images/kampery-na-wynajem-o-nas.jpg"
              width="318"
              height="378"
              alt={mainPage.teaserTitle + ' obraz'}
            ></Image>
            <Box sx={{ maxWidth: '512px' }}>
              <ReactMarkdown>{mainPage.teaserContent}</ReactMarkdown>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <Typography variant="h2">{mainPage.campersTitle}</Typography>
        <Typography variant="subtitle1">
          {mainPage.campersDescription}
        </Typography>
        {campers.map((camper) => (
          <CamperCard key={camper.name} camper={camper} />
        ))}
      </Container>
      <Container sx={{ position: 'relative' }}>
        <FaqAccordion faq={mainPage.faq} />
      </Container>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // propagating redux store with page settings data
  const docSnap = await fetchFBData<PageDataState>(
    db,
    process.env.FIREBASE_DB_PAGEDATA_COL as string,
    process.env.FIREBASE_DB_PAGEDATA_DOC as string
  );
  store.dispatch(setEnt(docSnap as PageDataState));

  // geting main page data
  const docMainPage = doc(
    db,
    process.env.FIREBASE_DB_MAINPAGE_COL as string,
    process.env.FIREBASE_DB_MAINPAGE_DOC as string
  );
  const docMainPageSnap = await getDoc(docMainPage);

  // getting reference data for FAQ
  let mainPage = docMainPageSnap.data() as any;
  mainPage.faq = await fetchRefs(mainPage.faq);

  const campersSnapshot = await getDocs(
    collection(db, process.env.FIREBASE_DB_CAMPERS as string)
  );

  // build campers array from camper collection snapshot
  const camperList = [] as any;
  campersSnapshot.forEach((doc) => {
    camperList.push(doc.data());
  });

  // get data from amenities refrences
  const campers = await Promise.all(
    camperList.map(async (camper: any) => {
      // get data for each amenity
      camper.mainAmenities = await fetchRefs(camper.mainAmenities);
      // get data for icons
      camper.mainAmenities = await Promise.all(
        camper.mainAmenities.map(async (amenitie: any) => {
          amenitie.icon = (await getDoc(amenitie.icon)).data();
          return amenitie;
        })
      );
      return camper;
    })
  );

  return {
    props: {
      mainPage: mainPage,
      campers: campers,
    },
  };
});

export default Home;
