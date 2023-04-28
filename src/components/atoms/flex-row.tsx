import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'

type RowProps = {
    styles?: SxProps<Theme> | undefined
    children: React.ReactNode
}

const Row = ({ styles, children }: RowProps) => (
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

export default Row
