import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const colors = {
  primary: '#1C6758',
  secondary: '#4CAF50',
  error: '#F44336',
  background: '#FAFAFA',
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
  },
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
