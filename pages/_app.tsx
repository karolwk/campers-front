import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar/NavBar';
import { navLinks } from '../shared/links';
import Footer from '../components/Footer/Footer';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar navLinks={navLinks} />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
