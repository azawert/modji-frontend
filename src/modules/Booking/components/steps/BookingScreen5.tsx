import { useForm, UseFormReturn } from "react-hook-form"
import { BookingModal } from "../modal/BookingModal/BookingModal"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  IPayment,
  ScreenSchema4,
} from "../../model/types/BookingValidationSchema"
import useBookingStore from "../../store/BookingStore"
import { PriceForm } from "../form/blocks/PriceForm/PriceForm"
import { StepTitle } from "../typography/StepTitle/StepTitle"

const BookingScreen5 = () => {
  const bookingData = useBookingStore(state => state.bookingData)

  const form = useForm({
    resolver: yupResolver(ScreenSchema4),
    defaultValues: {
      pricePerDay: bookingData.pricePerDay || 0,
      prepayment: bookingData.prepayment || 0,
      isPrepaymentPaid: bookingData.isPrepaymentPaid || false,
    },
  })

  return (
    <BookingModal isDirty={true} onSubmit={form.handleSubmit}>
      <StepTitle title="Шаг 4: Стоимость" />
      <PriceForm
        bookingData={bookingData}
        form={form as unknown as UseFormReturn<IPayment>}
      />
    </BookingModal>
  )
}

export default BookingScreen5
