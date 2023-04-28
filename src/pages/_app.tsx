import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from '@/components/organisms/navbar'
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles'

let theme = createTheme()
theme = responsiveFontSizes(theme)

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Navbar />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
