import { Box, Container, Typography } from '@mui/material'

export default function About() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ maxWidth: '600px' }}>
                <Typography
                    variant="h1"
                    sx={{
                        mb: '16px',
                        mt: '32px',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: '#1DB954',
                    }}
                >
                    About
                </Typography>
                <Typography sx={{ mb: '16px' }}>
                    This is a tool to for musicians to generate album artwork from their song lyrics
                    using AI, in a cost-effective manner.
                </Typography>
                <Typography sx={{ mb: '16px' }}>
                    AI is empowering artists to express their creativity in new, exciting ways. Our
                    mission is to provide accessible, cutting-edge technology that enables musicians
                    and other creatives to reach their full potential.
                </Typography>

                <Typography sx={{ mb: '16px' }}>
                    If you have any questions or feedback, please don&apos;t hesitate to reach out
                    to us at joepreyer@gmail.com
                </Typography>
                <Typography sx={{ mb: '16px' }}>Thank you for using our tool!</Typography>
                {/* @ts-ignore */}
                <mash-boost-button display-mode="icon-only" float-location="bottom-left" />
            </Box>
        </Container>
    )
}
