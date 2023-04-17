import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { AppProps } from 'next/app';
import { darkTheme } from '../themes';
import '../styles/globals.css';
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
