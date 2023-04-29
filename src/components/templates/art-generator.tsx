import Head from 'next/head'
import CenteredColumn from '@/components/atoms/centered-column'
import { Box, Button, Container, TextField, Typography, CircularProgress, Alert } from '@mui/material'
import Heading from '../atoms/heading'
import SelectInput from '../molecules/select-input'

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
    styleOptions: string[]
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
    styleOptions,
}: ArtGeneratorProps) {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Heading>{title}</Heading>
            <Box sx={{ maxWidth: '600px' }}>
                <Typography sx={{ mb: '16px' }}>{subtitle}</Typography>
                <CenteredColumn styles={{ maxWidth: '600px', mb: '32px', width: { xs: '100%', sm: '580px' } }}>
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
                    <SelectInput
                        selectStyles={{ mb: '16px', width: '100%', color: 'white' }}
                        id="style-select"
                        value={stylePrompt}
                        onChange={(e) => setStylePrompt(e.target.value)}
                        label="Style Prompt"
                        options={styleOptions}
                    />
                    {!!loadingMessage ? (
                        <CenteredColumn>
                            <CircularProgress />
                            <Typography sx={{ mb: '16px', mt: '32px' }}>{loadingMessage}</Typography>
                        </CenteredColumn>
                    ) : (
                        <>
                            <Button
                                onClick={generateArt}
                                sx={{ width: 'fit-content' }}
                                variant="contained"
                                type="submit"
                            >
                                Create Album Art
                            </Button>
                            <Box sx={{ pt: '32px' }}>
                                {!!error && (
                                    <Alert sx={{ mt: '16px' }} severity="error">
                                        {error}
                                    </Alert>
                                )}
                                {!!image && (
                                    <>
                                        <Typography sx={{ mb: '16px' }}>
                                            Your album art is ready! Right-click the image and save it to download.
                                        </Typography>
                                        <a href={image} download="album-art.jpg" target="_blank">
                                            <Box component="img" src={image} sx={{ width: '100%' }} />
                                        </a>
                                    </>
                                )}
                            </Box>
                        </>
                    )}
                </CenteredColumn>
            </Box>
        </Container>
    )
}
