import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
// import '@mantine/notifications/styles.css';
import type { AppProps } from 'next/app';
import 'regenerator-runtime/runtime';
import { Notifications } from '@mantine/notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <MantineProvider>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
}

export default MyApp;
