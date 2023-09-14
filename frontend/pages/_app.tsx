import { MantineProvider } from '@mantine/core'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CustomFonts } from '../components/custom-fonts'

function MyApp({ Component, pageProps }: AppProps) {
  return <MantineProvider>
    <CustomFonts/>
    <Component {...pageProps} />
  </MantineProvider>
}

export default MyApp
