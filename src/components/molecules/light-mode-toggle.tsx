import { Box, Switch, SxProps, Theme } from '@mui/material'
import LightIcon from '@mui/icons-material/LightMode'
import DarkIcon from '@mui/icons-material/DarkMode'

type LightModeToggleProps = {
    isDarkMode: boolean
    handleThemeChange: () => void
    styles?: SxProps<Theme>
}

const LightModeToggle = ({ isDarkMode, handleThemeChange, styles }: LightModeToggleProps) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            ...styles,
        }}
    >
        <Switch checked={isDarkMode} onChange={handleThemeChange} color="primary" />
        {isDarkMode ? <DarkIcon /> : <LightIcon />}
    </Box>
)

export default LightModeToggle
