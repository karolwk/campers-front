import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const colors = {
  primary: '#1C6758',
  secondary: '#3D8361',
  tertiary: '#D6CDA4',
  quaternary: '#EEF2E6',
  error: '#F44336',
  background: '#EEF2E6',
  text: '#212121',
};

let theme = createTheme({
  
  typography: {
    
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      fontWeight: 600,
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '2rem',
    },
    
  },

  palette: {
    contrastThreshold: 4.5,
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
