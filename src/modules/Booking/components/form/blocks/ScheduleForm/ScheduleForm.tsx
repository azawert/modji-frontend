import {
  InputDataFormat,
  SCHEDULE_CHECKIN,
  SCHEDULE_DEPARTURE,
} from "@/modules/Booking/consts/DateData"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import { TextField, TIconInputPosition } from "@/shared/ui/TextField"
import { DatePicker } from "@/widgets/DatePicker/DatePicker"
import dayjs from "dayjs"
import { useCallback, useState } from "react"
import { Controller, DeepPartial, UseFormReturn } from "react-hook-form"
import { BookingSelect } from "../../fields/BookingSelect/BookingSelect"
import {
  IBookingForm,
  IScheduleForm,
} from "@/modules/Booking/model/types/BookingValidationSchema"

interface ScheduleProps {
  form: UseFormReturn<IScheduleForm>
  bookingData: DeepPartial<IBookingForm>
}

export const ScheduleForm = (props: ScheduleProps) => {
  const { form, bookingData } = props
  const {
    register,
    formState: { errors },
    control,
    clearErrors,
    setValue,
  } = form

  // TODO: Now dayjs wrong convert bookingData properties from string date to dayjs (month and day are swapped)
  // TODO: Fix it and delete dateForDayJs
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

  //Datepicker
  const [dateFrom, setDateFrom] = useState<null | dayjs.Dayjs>(
    isDateFromValid ? dateForDayJs(bookingData.dateFrom) : null
  )
  const [dateTo, setDateTo] = useState<null | dayjs.Dayjs>(
    isDateToValid ? dateForDayJs(bookingData.dateTo) : null
  )
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<string | null>(null)

  const daysDifference = dateTo
    ?.diff(dateFrom?.subtract(1, "day"), "day")
    .toString()

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
    <div className="flex flex-col">
      <div className="flex flex-col gap-x-2">
        <div className="flex flex-row gap-4">
          <div className="relative">
            <TextField
              width="260px"
              id={Placeholder.DATE_FROM.valueOf()}
              placeholder={Placeholder.DATE_FROM}
              value={dateFrom?.format(InputDataFormat)}
              label={
                dateFrom?.format(InputDataFormat)?.length
                  ? Placeholder.DATE_FROM.valueOf()
                  : ""
              }
              onClick={() =>
                setIsDatePickerOpen(Placeholder.DATE_FROM.valueOf())
              }
              error={errors.dateFrom?.message}
              {...register("dateFrom")}
              iconType="CalendarIcon"
              iconPosition={TIconInputPosition.RIGHT}
            />
            <DatePicker
              onClose={() => setIsDatePickerOpen(null)}
              isOpen={isDatePickerOpen === Placeholder.DATE_FROM.valueOf()}
              value={dateFrom}
              minDate={dayjs()}
              maxDate={dateTo}
              onChange={onChangeDate("dateFrom")}
              cls="absolute top-20 z-50"
              disablePastDates
            />
          </div>
          <Controller
            control={control}
            name={"timeFrom"}
            render={({ field }) => (
              <BookingSelect
                className="w-64"
                data={SCHEDULE_CHECKIN}
                marginBottom="16px"
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

        <div className="flex flex-row gap-3">
          <div className="relative">
            <TextField
              width={"260px"}
              id={Placeholder.DATE_TO.valueOf()}
              placeholder={Placeholder.DATE_TO}
              label={
                dateTo?.format(InputDataFormat).length
                  ? Placeholder.DATE_TO.valueOf()
                  : ""
              }
              value={dateTo?.format(InputDataFormat)}
              onClick={() => setIsDatePickerOpen(Placeholder.DATE_TO.valueOf())}
              {...register("dateTo")}
              error={errors.dateTo?.message}
              iconType="CalendarIcon"
              iconPosition={TIconInputPosition.RIGHT}
            />
            <DatePicker
              onClose={handleCloseDatePicker}
              isOpen={isDatePickerOpen === Placeholder.DATE_TO.valueOf()}
              value={dateTo}
              onChange={onChangeDate("dateTo")}
              minDate={dateFrom?.add(1, "day")}
              cls="absolute top-20 z-50"
              disablePastDates
            />
          </div>
          <Controller
            control={control}
            name={"timeTo"}
            render={({ field }) => (
              <BookingSelect
                className="w-64"
                data={SCHEDULE_DEPARTURE}
                marginBottom="16px"
                placeholder={Placeholder.TIME_TO.valueOf()}
                label={field.value?.length ? Placeholder.TIME_TO.valueOf() : ""}
                {...field}
                error={errors.timeTo?.message}
              />
            )}
          />
        </div>
      </div>
      <TextField
        label={Placeholder.DAYS_AMOUNT}
        id={Placeholder.DAYS_AMOUNT.valueOf()}
        placeholder={Placeholder.DAYS_AMOUNT}
        value={daysDifference! + 1 || bookingData.daysAmount! + 1}
        className="w-56"
        {...register("daysAmount")}
      />
    </div>
  )
}
