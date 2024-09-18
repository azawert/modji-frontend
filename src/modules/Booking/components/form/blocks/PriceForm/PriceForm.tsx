import { TextField } from "@/shared/ui/TextField"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import dayjs from "dayjs"
import { useState } from "react"
import { Controller, DeepPartial, UseFormReturn } from "react-hook-form"
import {
  IBookingForm,
  IPayment,
} from "@/modules/Booking/model/types/BookingValidationSchema"
import { CustomCheckbox } from "@/shared/ui/Checkbox"

interface PriceProps {
  form: UseFormReturn<IPayment>
  bookingData: DeepPartial<IBookingForm>
}

export const PriceForm = (props: PriceProps) => {
  const { form, bookingData } = props
  const {
    register,
    formState: { errors },
    control,
  } = form

  const dateForDayJs = (date: string) => {
    if (!date) return dayjs()
    const dateArr = date?.split(".").reverse()
    const currentDate = new Date(
      Number(dateArr[0]),
      Number(dateArr[1]) - 1,
      Number(dateArr[2])
    )
    return dayjs(currentDate)
  }

  const bookingDaysAmount = dateForDayJs(bookingData.dateTo!).diff(
    dateForDayJs(bookingData.dateFrom!),
    "day"
  )

  const [pricePerDay, setPricePerDay] = useState(bookingData.pricePerDay)
  const [prepayment, setPrepayment] = useState(bookingData.prepayment)

  const handleChangePrice =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (isNaN(Number(value))) return
      if (type === "pricePerDay") setPricePerDay(Number(value))
      if (type === "prepayment") setPrepayment(Number(value))
    }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-6">
        <TextField
          label={Placeholder.PRICE_PER_DAY.valueOf()}
          id={Placeholder.PRICE_PER_DAY.valueOf()}
          placeholder={Placeholder.PRICE_PER_DAY.valueOf()}
          value={pricePerDay}
          className="w-64"
          error={errors?.pricePerDay?.message}
          {...register("pricePerDay")}
          onChange={e => handleChangePrice("pricePerDay")(e)}
        />
        <TextField
          label={Placeholder.FULL_PRICE.valueOf()}
          id={Placeholder.FULL_PRICE.valueOf()}
          placeholder={Placeholder.FULL_PRICE.valueOf()}
          value={Number(pricePerDay) * bookingDaysAmount || 0}
          onChange={() => {}}
          onClick={() => {}}
          className="w-64"
          disabled
        />
      </div>
      <Controller
        control={control}
        name={"isPrepaymentPaid"}
        render={({ field }) => (
          <CustomCheckbox
            label={Placeholder.IS_PREPAYMENT_PAID.valueOf()}
            labelPlacement="end"
            value={field.value!}
            onChange={field.onChange}
          />
        )}
      />
      <TextField
        label={Placeholder.PREPAYMENT.valueOf()}
        id={Placeholder.PREPAYMENT.valueOf()}
        placeholder={Placeholder.PREPAYMENT.valueOf()}
        value={prepayment}
        className="w-64"
        error={errors?.prepayment?.message}
        {...register("prepayment")}
        onChange={e => handleChangePrice("prepayment")(e)}
      />
    </section>
  )
}
