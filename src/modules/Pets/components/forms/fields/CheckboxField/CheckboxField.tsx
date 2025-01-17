import { CustomCheckbox } from "@/shared/ui/Checkbox"
import React from "react"
import { Controller } from "react-hook-form" // Импортируйте ваш кастомный Checkbox

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
  control: any
  errors: any
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
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
          value={value}
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

export default CheckboxField
