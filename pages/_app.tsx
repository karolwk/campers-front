import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar/NavBar';
import { navLinks } from '../shared/links';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Footer from '../components/layouts/Footer/Footer';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import '../styles/globals.css';
import createEmotionCache from '../shared/createEmoticonCache';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  ...rest
}: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar navLinks={navLinks} />
          <Component {...props.pageProps} />
          <Footer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
