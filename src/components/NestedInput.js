import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

const NestedInput = ({name, label }) => {

   const { control } = useFormContext()

    return (
        <Grid item xs={12} sm={6}>
            <Controller
            rules={{ required: true  }}
            name={name}
            label={label}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField fullWidth onChange={onChange} value={value} label={label} /> 
              )}
             
            />
        </Grid>
    )
}

export default NestedInput
