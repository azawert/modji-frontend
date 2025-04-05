import { useEffect, useRef } from "react"

import { UseFormReturn } from "react-hook-form"

import {
  ExtendedIPayment,
  IBookingForm,
} from "@/modules/Booking/model/types/BookingValidationSchema"

export const useFormPriceControl = (
  isCreateBookingPage: boolean,
  form: UseFormReturn<ExtendedIPayment>,
  formValues: ExtendedIPayment,
  bookingData: IBookingForm,
) => {
  const prevFullPriceRef = useRef(0)

  useEffect(() => {
    let fullPrice
    if (
      !isCreateBookingPage &&
      formValues?.pricePerDay &&
      bookingData?.daysAmount &&
      formValues.pricePerDay * bookingData?.daysAmount !==
        prevFullPriceRef.current
    ) {
      fullPrice = formValues?.pricePerDay * bookingData?.daysAmount
      form.setValue("fullPrice", fullPrice)
      prevFullPriceRef.current = fullPrice
    } else if (
      isCreateBookingPage &&
      formValues?.pricePerDay &&
      formValues.daysAmount &&
      formValues.pricePerDay * formValues?.daysAmount !==
        prevFullPriceRef.current
    ) {
      fullPrice = formValues?.pricePerDay * formValues?.daysAmount
      form.setValue("fullPrice", fullPrice)
      prevFullPriceRef.current = fullPrice
    }
  }, [bookingData, form, formValues, isCreateBookingPage])
}
