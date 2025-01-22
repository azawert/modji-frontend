import { Control, Controller, FieldErrors } from "react-hook-form"
import { TextField } from "@/shared/ui/TextField"
import { InputTextField } from "../../types/types"

interface ControlledTextFieldProps {
  control: Control
  errors: FieldErrors
  formValues: { [key: string]: string }
  field: InputTextField
}

export const ControlledText = ({
  control,
  errors,
  formValues,
  field,
}: ControlledTextFieldProps) => {
  return (
    <Controller
      name={field.name as never}
      control={control}
      render={({ field: { onChange, value } }) => {
        const disabled = field?.disabledFn
          ? field.disabledFn(formValues)
          : false
        const computedValue =
          field.valueFn && formValues ? field.valueFn(formValues, value) : value
        return (
          <TextField
            id={field.id}
            placeholder={field.label}
            label={field.label}
            value={computedValue}
            onChange={onChange}
            className="w-px-1"
            error={errors[field.name]?.message as string | undefined}
            disabled={disabled}
            isTextarea={field.isTextArea}
          />
        )
      }}
    />
  )
}
