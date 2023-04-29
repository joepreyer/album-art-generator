import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'

type CenteredColumnProps = {
    styles?: SxProps<Theme> | undefined
    children: React.ReactNode
}

const CenteredColumn = ({ styles, children }: CenteredColumnProps) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...styles,
        }}
    >
        {children}
    </Box>
)

export default CenteredColumn
