import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar/NavBar';
import { navLinks } from '../shared/links';
import Footer from '../components/layouts/Footer/Footer';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import '../styles/globals.css';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar navLinks={navLinks} />
        <Component {...props.pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
