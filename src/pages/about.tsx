import { Box, Container, Typography } from '@mui/material'

export default function About() {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ maxWidth: '600px' }}>
                <Typography variant="h1" sx={{ mb: '16px', mt: '32px', textAlign: 'center' }}>
                    About Us
                </Typography>
                <Typography sx={{ mb: '16px' }}>
                    We are an innovative team of developers and designers dedicated to creating tools that empower
                    artists to express their creativity in new, exciting ways. Our mission is to provide accessible,
                    cutting-edge technology that enables musicians and other creatives to reach their full potential.
                </Typography>

                <Typography sx={{ mb: '16px' }}>
                    If you have any questions or feedback, please don't hesitate to reach out to us at
                    contact@ourwebsite.com.
                </Typography>
                <Typography sx={{ mb: '16px' }}>Thank you for using our tool!</Typography>
                {/* @ts-ignore */}
                {/* <mash-boost-button display-mode="icon-only" float-location="bottom-left" /> */}
            </Box>
        </Container>
    )
}
