import type { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/layouts/Layout/Layout';
import { wrapper } from '../store/store';
import db, {
  fetchCampersWithRefs,
  fetchPageData,
  fetchRefs,
} from '../utils/db/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { setEnt } from '../store/pageDataSlice';
import { PageDataState } from '../shared/types';
import { Box, Button, Container, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';
import { MainPageData, Camper } from '../shared/types';
import IconCard from '../components/cards/IconCard/IconCard';
import ReactMarkdown from 'react-markdown';
import CamperCard from '../components/cards/CamperCard/CamperCard';
import FaqAccordion from '../components/ui/FaqAccordion/FaqAccordion';
import Link from 'next/link';
import { Animate } from '../components/animations/Animate/Animate';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import BoxWithBackground from '../components/ui/BoxWithBackground/BoxWithBackground';
type HomeProps = {
  mainPage: MainPageData;
  campers: Camper[];
};

const Home: NextPage<HomeProps> = ({ campers, mainPage }) => {
  return (
    <Layout
      metaTitle="Kampery na wynajem Kraków - zacznij swoją własną przygodę!"
      metaDescription="Nasza firma oferuje wynajem w pełni wyposażonych i przystosowanych do podróży kamperów. Sami jesteśmy pasjonatami aktywności turystycznych i odwiedzania różnorodnych zakątków świata. Chętnie doradzamy naszym klientom, jak odpowiednio zorganizować podróż kamperem i o czym należy pamiętać."
    >
      <Box component="section" className={styles.mainImageSection}>
        <Image
          src="/images/background8a.jpg"
          alt="dia"
          layout="fill"
          objectPosition="center"
          objectFit="cover"
          priority
        />
        <Box className={styles.imageSectionBox}>
          <Typography variant="h1">Wakacje bez granic</Typography>
          <Typography variant="subtitle1" fontSize={20}>
            Luksusowe kampery w Krakowie i okolicach dla Ciebie
          </Typography>
          <Link href="/kampery" passHref>
            <Button
              variant="contained"
              color="success"
              size="large"
              className={styles.bigButton}
            >
              Sprawdź naszą ofertę
            </Button>
          </Link>
        </Box>
      </Box>

      <Container component="section">
        <Typography
          variant="h2"
          className={styles.sectionTitle}
          marginTop={'2rem'}
        >
          Dlaczego my
        </Typography>
        <Box className={styles.icons}>
          {mainPage.icons.map((icon, index) => {
            return (
              <Animate.SlideFromRihght
                key={icon.title}
                component={Box}
                sx={{ flex: 1 }}
                transition="1s all"
                transitionDelay={`${index * 100 + 200}ms`}
              >
                <IconCard
                  iconURL={icon.iconURL}
                  iconTitle={icon.title}
                  iconDescription={icon.description}
                />
              </Animate.SlideFromRihght>
            );
          })}
        </Box>
      </Container>

      <Box className={styles.aboutSection} id="about">
        <Typography variant="h2" className={styles.sectionTitle}>
          {mainPage.teaserTitle}
        </Typography>
        <Container
          component="section"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          <Animate.FadeIn component={Box} className={styles.circleBox}>
            <Image
              src="/images/kampery-na-wynajem-o-nas.jpg"
              width={318}
              height={378}
              alt={mainPage.teaserTitle + ' obraz'}
            ></Image>
          </Animate.FadeIn>

          <Animate.FadeUp component={Box} sx={{ maxWidth: '512px' }}>
            <ReactMarkdown className="">{mainPage.teaserContent}</ReactMarkdown>
          </Animate.FadeUp>
        </Container>
      </Box>
      <Container className={styles.campersSetion}>
        <Typography variant="h2" align="center" fontWeight={500}>
          {mainPage.campersTitle}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {mainPage.campersDescription}
        </Typography>
        <Grid2 container spacing={4} marginY={'2rem'}>
          {campers.map((camper) => (
            <Grid2 xs={12} sm={6} md={4} key={camper.name}>
              <Animate.FadeUp component={Box} height="100%">
                <CamperCard camper={camper} />
              </Animate.FadeUp>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      <BoxWithBackground bgImage="/images/bg-droga.jpg">
        <Container component="section" className={styles.faqSection}>
          <Typography
            variant="h2"
            align="center"
            fontWeight={500}
            marginY="2rem"
            zIndex={2}
          >
            Najczęsciej zadawane pytania
          </Typography>
          <FaqAccordion faq={mainPage.faq} />
        </Container>
      </BoxWithBackground>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // propagating redux store with page settings data
  const docSnap = await fetchPageData();
  store.dispatch(setEnt(docSnap.data() as PageDataState));

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

  // fetching campers data
  const campers = await fetchCampersWithRefs(campersSnapshot);

  return {
    props: {
      mainPage: mainPage,
      campers: campers,
    },
  };
});

export default Home;
