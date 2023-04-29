import { Typography } from '@mui/material'

type HeadingProps = {
    children: React.ReactNode
}

const Heading = ({ children }: HeadingProps) => (
    <Typography variant="h1" sx={{ my: '32px', textAlign: 'center', color: '#1DB954', fontWeight: '700' }}>
        {children}
    </Typography>
)

export default Heading
