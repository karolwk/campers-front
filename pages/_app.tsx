import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar/NavBar';
import { navLinks } from '../shared/links';
import Footer from '../components/Footer/Footer';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <CssBaseline />
      <NavBar navLinks={navLinks} />
      <Component {...props.pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
