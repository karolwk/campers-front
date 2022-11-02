import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import NavBar from '../components/nav/NavBar/NavBar';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout title="Kampery na wynajem" description="Wynajem kamperow Wieliczka">
      <Image src="/images/background.jpg" alt="dia" layout="fill" />
      <h1>
        {[...new Array(122)]
          .map((ele) => {
            return 'Nam provident pariatur pariatur amet vero. Et consequatur modi ut molestiae assumenda voluptas numquam doloremque. Et reprehenderit nostrum quisquam nisi ipsum tempore.';
          })
          .join('\n')}
      </h1>
    </Layout>
  );
};

export default Home;
