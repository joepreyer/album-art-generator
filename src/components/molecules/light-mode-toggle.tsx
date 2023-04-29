import { Switch, SxProps, Theme } from '@mui/material'
import LightIcon from '@mui/icons-material/LightMode'
import DarkIcon from '@mui/icons-material/DarkMode'
import CenteredRow from '../atoms/centered-row'

type LightModeToggleProps = {
    isDarkMode: boolean
    handleThemeChange: () => void
    styles?: SxProps<Theme>
}

const LightModeToggle = ({ isDarkMode, handleThemeChange, styles }: LightModeToggleProps) => (
    <CenteredRow styles={styles}>
        <Switch checked={isDarkMode} onChange={handleThemeChange} color="primary" />
        {isDarkMode ? <DarkIcon /> : <LightIcon />}
    </CenteredRow>
)

export default LightModeToggle
