//A column component made with Material UI that takes in an optional className and children to be rendered inside it
//This component is used to make the layout of the page
import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'

type ColumnProps = {
    styles?: SxProps<Theme> | undefined
    children: React.ReactNode
}

const Column = ({ styles, children }: ColumnProps) => (
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

export default Column
