import Heading from '@/components/atoms/heading'
import { Box, Container, Typography } from '@mui/material'

type AboutTemplateProps = {
    paragraphs: string[]
    heading: string
}

export default function AboutTemplate({ paragraphs, heading }: AboutTemplateProps) {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ maxWidth: '600px' }}>
                <Heading>{heading}</Heading>
                {paragraphs.map((paragraph, index) => (
                    <Typography key={index} sx={{ mb: '16px' }}>
                        {paragraph}
                    </Typography>
                ))}
            </Box>
        </Container>
    )
}
