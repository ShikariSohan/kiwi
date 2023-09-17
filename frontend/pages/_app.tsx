import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import 'regenerator-runtime/runtime';

const inter = Inter({ subsets: ['latin'] });
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
}

export default MyApp;
