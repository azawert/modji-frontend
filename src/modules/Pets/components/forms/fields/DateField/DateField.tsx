import React, { useState } from "react"
import { Controller } from "react-hook-form"
import dayjs, { Dayjs } from "dayjs" // Замените на вашу библиотеку типов
import { TextField, TIconInputPosition } from "@/shared/ui/TextField"
import { DatePicker } from "@/widgets/DatePicker/DatePicker"
import { DateField } from "../../configs/types"

const InputDataFormat = "DD.MM.YYYY" // Формат даты

type CustomDatePickerProps = {
  field: DateField
  control: any
  errors: any
}

export const CustomDatePicker = ({
  field,
  control,
  errors,
}: CustomDatePickerProps) => {
  const [openDatePickerId, setOpenDatePickerId] = useState<string | null>(null)
  const [dateValue, setDateValue] = useState<Dayjs | null>(null)

  return (
    <Controller
      key={field.name}
      name={field.name}
      control={control}
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
              error={errors[field.name]?.message}
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
            <p className="mt-2 text-sm text-red-600">
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      )}
    />
  )
}
