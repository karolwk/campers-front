import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar/NavBar';
import { navLinks } from '../shared/links';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar navLinks={navLinks} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
