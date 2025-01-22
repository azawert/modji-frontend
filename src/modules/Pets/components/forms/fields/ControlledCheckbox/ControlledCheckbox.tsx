import { CustomCheckbox } from "@/shared/ui/Checkbox"
import React from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { FormData } from "../../types/types"

type CheckboxFieldProps = {
  name: string
  label?: string
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
  name,
  label,
  isDisabled,
  isCheckedByDefault,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { onChange, value } }) => (
        <CustomCheckbox
          value={value as boolean}
          onChange={onChange}
          label={label}
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
