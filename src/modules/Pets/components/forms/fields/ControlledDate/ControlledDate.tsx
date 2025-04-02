import { useState } from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import dayjs, { Dayjs } from "dayjs"
import {
  TextField,
  TIconInputPosition,
} from "@/shared/ui/Inputs/TextField/TextField"
import { DatePicker } from "@/widgets/DatePicker/DatePicker"
import { DateField, FormData } from "../../types/types"
import { FieldError } from "@/shared/ui/Inputs/FieldError/FieldError"

const InputDataFormat = "DD.MM.YYYY"

type CustomDatePickerProps = {
  field: DateField
  control: Control<FormData>
  errors: FieldErrors<FormData>
  readOnly?: boolean
  formValues?: { [key: string]: string }
}

export const ControlledDate = ({
  field,
  control,
  errors,
  readOnly,
  formValues,
}: CustomDatePickerProps) => {
  const [openDatePickerId, setOpenDatePickerId] = useState<string | null>(null)
  const [dateValue, setDateValue] = useState<Dayjs | null>(
    formValues?.[field.name] ? dayjs(formValues?.[field.name]) : null
  )

  return (
    <Controller
      key={field.name}
      name={field.name}
      control={control}
      disabled={readOnly}
      defaultValue=""
      render={({ field: { onChange } }) => (
        <div>
          <div className="relative">
            <TextField
              placeholder={field.label as string}
              id={field.id}
              value={dateValue ? dateValue.format(InputDataFormat) : ""}
              label={field.label}
              onClick={() => setOpenDatePickerId(field.id)}
              error={errors[field.name]?.message as string | undefined}
              iconType="CalendarIcon"
              iconPosition={TIconInputPosition.RIGHT}
            />
            {openDatePickerId === field.id && (
              <DatePicker
                onClose={() => setOpenDatePickerId(null)}
                isOpen={openDatePickerId === field.id}
                value={dateValue}
                disableFutureDates={field.isPast}
                disablePastDates={!field.isPast}
                onChange={(date: Dayjs) => {
                  setDateValue(date)
                  onChange(date.format(InputDataFormat))
                }}
                cls="absolute top-20 z-50"
              />
            )}
          </div>
          {errors[field.id] && (
            <FieldError error={errors[field.id]!.message as string} />
          )}
        </div>
      )}
    />
  )
}
