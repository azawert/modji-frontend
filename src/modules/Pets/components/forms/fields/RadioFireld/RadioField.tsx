import { Controller } from "react-hook-form"
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material"
import { RadioField as RadioFieldType } from "../../configs/types"

interface CustomRadioFieldProps {
  field: RadioFieldType
  control: any
  errors: any
}

const RadioField = ({ field, control, errors }: CustomRadioFieldProps) => {
  return (
    <Controller
      key={field.name}
      name={field.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl component="fieldset" error={!!errors[field.id]}>
          <FormLabel
            component="legend"
            className="text-sm font-medium text-gray-700"
          >
            {field.label}
          </FormLabel>
          <RadioGroup
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="mt-1 space-y-2 flex flex-row"
          >
            {field.options.map(option => (
              <FormControlLabel
                key={option.label}
                value={option.value}
                control={<Radio />}
                label={
                  <span className="text-sm text-gray-700">{option.label}</span>
                }
              />
            ))}
          </RadioGroup>
          {errors[field.id] && (
            <FormHelperText className="text-red-600">
              {errors[field.name]?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default RadioField
