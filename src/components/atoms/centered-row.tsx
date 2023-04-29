import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'

type CenteredRowProps = {
    styles?: SxProps<Theme> | undefined
    children: React.ReactNode
}

const CenteredRow = ({ styles, children }: CenteredRowProps) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            ...styles,
        }}
    >
        {children}
    </Box>
)

export default CenteredRow
