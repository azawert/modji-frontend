import {
  InputDataFormat,
  SCHEDULE_CHECKIN,
  SCHEDULE_DEPARTURE,
} from "@/modules/Booking/consts/DateData"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import {
  TextField,
  TIconInputPosition,
} from "@/shared/ui/Inputs/TextField/TextField"
import { DatePicker } from "@/widgets/DatePicker/DatePicker"
import dayjs from "dayjs"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  Controller,
  DeepPartial,
  UseFormReturn,
  useWatch,
} from "react-hook-form"
import {
  IBookingForm,
  IScheduleForm,
} from "@/modules/Booking/model/types/BookingValidationSchema"
import { getDayDifference } from "@/modules/Pets/components/forms/utils/calcDifference"
import { Select } from "@/shared/ui/Inputs"

interface ScheduleProps {
  form: UseFormReturn<IScheduleForm>
  bookingData: DeepPartial<IBookingForm>
}

export const ScheduleForm = (props: ScheduleProps) => {
  const { form, bookingData } = props
  const {
    formState: { errors },
    control,
    clearErrors,
    setValue,
  } = form

  const dateForDayJs = (date?: string) => {
    if (!date) return dayjs()
    const dateArr = date?.split(".").reverse()
    const currentDate = new Date(
      Number(dateArr[0]),
      Number(dateArr[1]) - 1,
      Number(dateArr[2])
    )
    return dayjs(currentDate)
  }

  const isDateFromValid = dayjs(bookingData.dateFrom, InputDataFormat).isValid()
  const isDateToValid = dayjs(bookingData.dateTo, InputDataFormat).isValid()

  const [dateFrom, setDateFrom] = useState<null | dayjs.Dayjs>(
    isDateFromValid ? dateForDayJs(bookingData.dateFrom) : null
  )
  const [dateTo, setDateTo] = useState<null | dayjs.Dayjs>(
    isDateToValid ? dateForDayJs(bookingData.dateTo) : null
  )
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<string | null>(null)

  const prevDateRef = useRef(0)

  const formValues = useWatch({ control })

  useEffect(() => {
    const daysDifference = getDayDifference(
      formValues?.dateTo as string,
      formValues?.dateFrom as string
    )
    if (daysDifference && daysDifference !== prevDateRef.current) {
      setValue("daysAmount", Number(daysDifference))
      prevDateRef.current = daysDifference!
    }
  }, [formValues, dateFrom, dateTo, setValue])

  const onChangeDate = useCallback(
    (type: "dateFrom" | "dateTo") => (date: dayjs.Dayjs) => {
      if (type === "dateFrom") {
        setDateFrom(date)
      }
      if (type === "dateTo") {
        setDateTo(date)
      }
      setValue(type, date.format(InputDataFormat))
      clearErrors(type)
    },
    [setValue, clearErrors]
  )

  const handleCloseDatePicker = useCallback(() => {
    setIsDatePickerOpen(null)
  }, [])

  return (
    <div className="flex flex-col" style={{ scrollbarGutter: "stable" }}>
      <div className="flex flex-col gap-x-2">
        <div className="flex flex-row gap-4 items-center">
          <div className="relative">
            <Controller
              control={control}
              name="dateFrom"
              render={({ field }) => (
                <>
                  <TextField
                    width="260px"
                    id={Placeholder.DATE_FROM.valueOf()}
                    placeholder={Placeholder.DATE_FROM}
                    value={field.value}
                    label={
                      field.value?.length ? Placeholder.DATE_FROM.valueOf() : ""
                    }
                    onClick={() =>
                      setIsDatePickerOpen(Placeholder.DATE_FROM.valueOf())
                    }
                    error={errors.dateFrom?.message}
                    iconType="CalendarIcon"
                    iconPosition={TIconInputPosition.RIGHT}
                  />
                  <DatePicker
                    onClose={() => setIsDatePickerOpen(null)}
                    isOpen={
                      isDatePickerOpen === Placeholder.DATE_FROM.valueOf()
                    }
                    value={dateFrom}
                    minDate={dayjs()}
                    maxDate={dateTo}
                    onChange={date => {
                      field.onChange(date.format(InputDataFormat))
                      onChangeDate("dateFrom")(date)
                    }}
                    cls="absolute top-10 z-50"
                    disablePastDates
                  />
                </>
              )}
            />
          </div>
          <Controller
            control={control}
            name={"timeFrom"}
            render={({ field }) => (
              <Select
                className="w-64"
                data={SCHEDULE_CHECKIN}
                placeholder={Placeholder.TIME_FROM.valueOf()}
                label={
                  field.value?.length ? Placeholder.TIME_FROM.valueOf() : ""
                }
                {...field}
                error={errors.timeFrom?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-row gap-3 items-center">
          <div className="relative">
            <Controller
              control={control}
              name="dateTo"
              render={({ field }) => (
                <>
                  <TextField
                    width={"260px"}
                    id={Placeholder.DATE_TO.valueOf()}
                    placeholder={Placeholder.DATE_TO}
                    label={
                      field.value?.length ? Placeholder.DATE_TO.valueOf() : ""
                    }
                    value={field.value}
                    onClick={() =>
                      setIsDatePickerOpen(Placeholder.DATE_TO.valueOf())
                    }
                    error={errors.dateTo?.message}
                    iconType="CalendarIcon"
                    iconPosition={TIconInputPosition.RIGHT}
                  />
                  <DatePicker
                    onClose={handleCloseDatePicker}
                    isOpen={isDatePickerOpen === Placeholder.DATE_TO.valueOf()}
                    value={dateTo}
                    onChange={date => {
                      field.onChange(date.format(InputDataFormat))
                      onChangeDate("dateTo")(date)
                    }}
                    minDate={dateFrom?.add(1, "day")}
                    cls="absolute z-50"
                    disablePastDates
                  />
                </>
              )}
            />
          </div>
          <Controller
            control={control}
            name={"timeTo"}
            render={({ field }) => (
              <Select
                className="w-64"
                data={SCHEDULE_DEPARTURE}
                placeholder={Placeholder.TIME_TO.valueOf()}
                label={field.value?.length ? Placeholder.TIME_TO.valueOf() : ""}
                {...field}
                error={errors.timeTo?.message}
              />
            )}
          />
        </div>
      </div>
      <Controller
        control={control}
        name="daysAmount"
        render={({ field }) => (
          <TextField
            {...field}
            label={Placeholder.DAYS_AMOUNT}
            id={Placeholder.DAYS_AMOUNT.valueOf()}
            placeholder={Placeholder.DAYS_AMOUNT}
            className="w-56"
            type="number"
            disabled
          />
        )}
      />
    </div>
  )
}
