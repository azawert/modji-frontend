import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { FormData, SliderField } from "../../types/types"

const marks = [
  { value: 0, label: "1" },
  { value: 10, label: "2" },
  { value: 20, label: "3" },
  { value: 30, label: "4" },
  { value: 40, label: "5" },
  { value: 50, label: "6" },
  { value: 60, label: "7" },
  { value: 70, label: "8" },
  { value: 80, label: "9" },
  { value: 90, label: "10" },
]

interface CustomSliderFieldProps {
  field: SliderField
  control: Control<FormData>
  errors: FieldErrors<FormData>
}

export const ControlledSlider = (props: CustomSliderFieldProps) => {
  const { control, field, errors } = props

  const sliderValue = (value: number) => (Number(value) - 1) * 10

  const handleChange = (
    event: Event,
    onChange: (value: number) => void,
    newValue: number | number[]
  ) => {
    event.preventDefault()
    if (typeof newValue === "number") {
      const formValue = newValue / 10 + 1
      onChange(formValue)
    }
  }

  return (
    <Controller
      key={field.name}
      name={field.name as never}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box sx={{ width: 700 }}>
          <span>{field.label}</span>
          <Slider
            aria-label="Restricted values"
            value={sliderValue(value)}
            onChange={(e, newValue) => handleChange(e, onChange, newValue)}
            step={null}
            valueLabelDisplay="off"
            marks={marks}
            min={0}
            max={90}
          />
          {errors[field.name] && (
            <p className="mt-2 text-sm text-red-600">
              {errors[field.name]?.message as string}
            </p>
          )}
        </Box>
      )}
    />
  )
}
