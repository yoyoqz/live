import { ChakraProvider } from '@chakra-ui/react';
import theme, { GlobalStyles } from '@livekit/livekit-chakra-theme';
//import '@livekit/react-components/dist/index.css';
import type { AppProps } from 'next/app';
//import '../styles/globals.css';
import styles from '../styles/Mobile.module.css';
//      <GlobalStyles />

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
    <div className={styles.container}>
      <div className={styles.stage}>     
      <Component {...pageProps} />
      </div>
    </div>    
    </ChakraProvider>
  );
}

export default MyApp;
