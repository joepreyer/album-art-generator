import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from '@/components/organisms/navbar'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useState } from 'react'
import { pages } from '@/content'
import { MashContext } from '@/context/mash-context'
import { useMash } from '@/hooks/use-mash'

const lightTheme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'light',
        },
    })
)

const darkTheme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'dark',
        },
    })
)

export default function App({ Component, pageProps }: AppProps) {
    const [isDarkMode, setIsDarkMode] = useState(true)

    const theme = isDarkMode ? darkTheme : lightTheme

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode)
    }

    const mash = useMash(process.env.NEXT_PUBLIC_MASH_EARNER_ID as string)

    return (
        <MashContext.Provider value={mash}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar
                    pages={pages}
                    isDarkMode={isDarkMode}
                    handleThemeChange={handleThemeChange}
                />
                <Component {...pageProps} />
            </ThemeProvider>
        </MashContext.Provider>
    )
}
