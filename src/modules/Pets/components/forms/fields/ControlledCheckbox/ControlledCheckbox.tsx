import { CustomCheckbox } from "@/shared/ui/Checkbox"
import React from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { CheckboxField, FormData } from "../../types/types"

type CheckboxFieldProps = {
  field: CheckboxField
  isDisabled?: boolean
  isCheckedByDefault?: boolean
  labelPlacement?: "end" | "start" | "top" | "bottom"
  labelSize?: string
  labelWeight?: string
  borderRadius?: string
  checkboxWidth?: string
  checkboxHeight?: string
  control: Control<FormData>
  errors: FieldErrors<FormData>
}

export const ControlledCheckbox: React.FC<CheckboxFieldProps> = ({
  field,
  isDisabled,
  isCheckedByDefault,
  control,
}) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <CustomCheckbox
          value={value as boolean}
          onChange={onChange}
          label={field.label}
          isDisabled={isDisabled}
          isCheckedByDefault={isCheckedByDefault}
          labelPlacement="end"
          labelSize="16px"
          labelWeight="400"
          borderRadius="4px"
          checkboxWidth="16px"
          checkboxHeight="16px"
        />
      )}
    />
  )
}
