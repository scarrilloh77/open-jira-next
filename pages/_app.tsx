import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import { darkTheme } from '../themes';
import '../styles/globals.css';
import { UIProvider } from '../context/ui';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}

export default MyApp;
