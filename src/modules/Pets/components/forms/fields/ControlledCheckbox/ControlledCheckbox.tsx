import React from "react"

import { Control, Controller, FieldErrors } from "react-hook-form"

import { CustomCheckbox } from "@/shared/ui/Inputs/Checkbox/Checkbox"

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
  readOnly?: boolean
}

export const ControlledCheckbox: React.FC<CheckboxFieldProps> = ({
  field,
  isDisabled,
  isCheckedByDefault,
  control,
  readOnly,
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
          isDisabled={isDisabled || readOnly}
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
