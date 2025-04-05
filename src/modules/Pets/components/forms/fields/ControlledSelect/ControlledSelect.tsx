import { Control, Controller, FieldErrors } from "react-hook-form"

import { Select } from "@/shared/ui/Inputs/Select/Select"

import { FormData, SelectField } from "../../types/types"

interface ControlledSelectProps {
  field: SelectField
  control: Control<FormData>
  errors: FieldErrors<FormData>
  readOnly?: boolean
}

export const ControlledSelect = (props: ControlledSelectProps) => {
  const { field, control, errors, readOnly } = props

  return (
    <Controller
      key={field.name}
      name={field.name as never}
      control={control}
      render={({ field: { onChange, value, onBlur } }) => (
        <Select
          renderValue={(value: string) =>
            field.options.find(o => o.value === value)?.label
          }
          fullWidth
          label={field.label}
          data={field.options}
          selectedValue={value}
          onChange={onChange}
          onBlur={onBlur}
          error={errors[field.name]?.message as string | undefined}
          isRequired={field.required}
          placeholder={field.label}
          disabled={readOnly}
        />
      )}
    />
  )
}
