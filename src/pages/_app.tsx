import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '@/components/organisms/navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
