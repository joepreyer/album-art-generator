import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ReactNode } from 'react'

type SelectInputProps = {
    label: string
    id: string
    options: string[]
    value: string
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
    selectStyles?: object
}

const SelectInput = ({ label, id, options, value, onChange, selectStyles }: SelectInputProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select labelId={id} sx={selectStyles} value={value} label={label} onChange={onChange}>
                {options.map((option: string, index: number) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectInput
