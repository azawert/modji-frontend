import { TextField } from "@/shared/ui/TextField"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import {
  Controller,
  DeepPartial,
  UseFormReturn,
  useWatch,
} from "react-hook-form"
import {
  ExtendedIPayment,
  IBookingForm,
} from "@/modules/Booking/model/types/BookingValidationSchema"
import { CustomCheckbox } from "@/shared/ui/Checkbox"
import { useLocation } from "react-router-dom"
import { useFormPriceControl } from "./useFullPriceControl"

interface PriceProps {
  form: UseFormReturn<ExtendedIPayment>
  bookingData: DeepPartial<IBookingForm>
}

export const PriceForm = (props: PriceProps) => {
  const { form, bookingData } = props
  const {
    formState: { errors },
    control,
  } = form

  const { pathname } = useLocation()
  const isCreateBookingPage = pathname.includes("create-booking")

  const formState = form.getValues()

  const formValues = useWatch<ExtendedIPayment>({ control })

  useFormPriceControl(
    isCreateBookingPage,
    form,
    formValues as ExtendedIPayment,
    bookingData as IBookingForm
  )

  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-6">
        <Controller
          control={control}
          name={"pricePerDay"}
          render={({ field }) => (
            <TextField
              {...field}
              label={Placeholder.PRICE_PER_DAY.valueOf()}
              id={Placeholder.PRICE_PER_DAY.valueOf()}
              placeholder={Placeholder.PRICE_PER_DAY.valueOf()}
              className="w-64"
              error={errors?.pricePerDay?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={"fullPrice"}
          render={({ field }) => (
            <TextField
              {...field}
              label={Placeholder.FULL_PRICE.valueOf()}
              id={Placeholder.FULL_PRICE.valueOf()}
              placeholder={Placeholder.FULL_PRICE.valueOf()}
              value={formState?.fullPrice}
              className="w-64"
              disabled
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name={"isPrepaymentPaid"}
        render={({ field }) => (
          <CustomCheckbox
            label={Placeholder.IS_PREPAYMENT_PAID.valueOf()}
            labelPlacement="end"
            {...field}
            value={field.value ?? false}
          />
        )}
      />
      <Controller
        control={control}
        name={"prepayment"}
        render={({ field }) => (
          <TextField
            {...field}
            label={Placeholder.PREPAYMENT.valueOf()}
            id={Placeholder.PREPAYMENT.valueOf()}
            placeholder={Placeholder.PREPAYMENT.valueOf()}
            className="w-64"
            error={errors?.prepayment?.message}
          />
        )}
      />
    </section>
  )
}
