import Head from 'next/head'
import Column from '@/components/atoms/flex-column'
import { Box, Button, Container, TextField, Typography, CircularProgress, Alert } from '@mui/material'

type ArtGeneratorProps = {
    title: string
    subtitle: string
    generateArt: () => void
    loadingMessage: string
    error: string | null
    lyrics: string
    setLyrics: (lyrics: string) => void
    stylePrompt: string
    setStylePrompt: (stylePrompt: string) => void
    image: string | null
}

export default function ArtGenerator({
    title,
    subtitle,
    generateArt,
    loadingMessage,
    error,
    lyrics,
    setLyrics,
    stylePrompt,
    setStylePrompt,
    image,
}: ArtGeneratorProps) {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Typography variant="h1" sx={{ my: '32px', textAlign: 'center', color: '#1DB954', fontWeight: '700' }}>
                {title}
            </Typography>
            <Box sx={{ maxWidth: '600px' }}>
                <Typography sx={{ mb: '16px' }}>{subtitle}</Typography>
                <Column styles={{ width: '100%', maxWidth: '600px', mb: '32px' }}>
                    <TextField
                        onChange={(e) => setLyrics(e.target.value)}
                        value={lyrics}
                        type="textarea"
                        label="Lyrics"
                        placeholder="Enter your song lyrics here. If your song doesn't have lyrics, write a description about how the song makes you feel, or some imagery that you think suits the song."
                        sx={{ mb: '16px', width: '100%' }}
                        multiline
                        rows={8}
                    />
                    <TextField
                        onChange={(e) => setStylePrompt(e.target.value)}
                        value={stylePrompt}
                        type="text"
                        label="Style Prompt"
                        placeholder="Enter a style (eg. abstract Picasso, high detail)"
                        sx={{ mb: '16px', width: '100%' }}
                    />
                    <Button onClick={generateArt} sx={{ width: 'fit-content' }} variant="contained" type="submit">
                        Create Album Art
                    </Button>
                    <Box sx={{ pt: '32px' }}>
                        {!!error && (
                            <Alert sx={{ mt: '16px' }} severity="error">
                                {error}
                            </Alert>
                        )}
                        {!!loadingMessage && (
                            <Column>
                                <CircularProgress />
                                <Typography sx={{ mb: '16px', mt: '32px' }}>{loadingMessage}</Typography>
                            </Column>
                        )}
                        {!!image && (
                            <>
                                <Typography sx={{ mb: '16px' }}> Click the image to download:</Typography>
                                <a href={image} download>
                                    <Box component="img" src={image} sx={{ width: '100%' }} />
                                </a>
                            </>
                        )}
                    </Box>
                </Column>
            </Box>
            {/* @ts-ignore */}
            <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
        </Container>
    )
}
