import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import { darkTheme } from '../themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
