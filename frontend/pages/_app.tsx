import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'regenerator-runtime/runtime';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
}

export default MyApp;
