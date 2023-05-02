import Heading from '@/components/atoms/heading'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Container, Typography } from '@mui/material'

type AboutTemplateProps = {
    paragraphs: string[]
    heading: string
    revealEmail: () => void
    emailHidden: boolean
    emailButtonLoading: boolean
    openEmail: () => void
    emailAddress: string
}

export default function AboutTemplate({
    paragraphs,
    heading,
    revealEmail,
    emailHidden,
    emailButtonLoading,
    openEmail,
    emailAddress,
}: AboutTemplateProps) {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ maxWidth: '600px' }}>
                <Heading>{heading}</Heading>
                {paragraphs.map((paragraph, index) => (
                    <Typography key={index} sx={{ mb: '16px' }}>
                        {paragraph}
                    </Typography>
                ))}
                <LoadingButton
                    loading={emailButtonLoading}
                    onClick={emailHidden ? revealEmail : openEmail}
                    sx={{ width: 'fit-content', textTransform: 'none' }}
                    variant="contained"
                    type="submit"
                >
                    {!emailHidden ? emailAddress : 'UNLOCK EMAIL'}
                </LoadingButton>
            </Box>
        </Container>
    )
}
