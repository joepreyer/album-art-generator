import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'

type ColumnProps = {
    styles?: SxProps<Theme> | undefined
    children: React.ReactNode
}

const FlexColumn = ({ styles, children }: ColumnProps) => (
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

export default FlexColumn
