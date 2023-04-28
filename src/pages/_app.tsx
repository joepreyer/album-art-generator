import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from '@/components/organisms/navbar'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useState } from 'react'
import { Switch } from '@mui/material'

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export default function App({ Component, pageProps }: AppProps) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const theme = isDarkMode ? darkTheme : lightTheme

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar isDarkMode={isDarkMode} handleThemeChange={handleThemeChange} />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
