const { default: AbortController } = require('abort-controller');
const { default: fetch, Headers, Request, Response } = require('node-fetch');

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar/NavBar';
import { navLinks } from '../shared/links';
import Footer from '../components/Footer/Footer';
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar navLinks={navLinks} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default wrapper.withRedux(MyApp);
