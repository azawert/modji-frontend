import { yupResolver } from "@hookform/resolvers/yup"
import { BookingModal } from "../modal/BookingModal/BookingModal"
import { useForm } from "react-hook-form"
import { ScreenSchema1 } from "../../model/types/BookingValidationSchema"
import useBookingStore from "../../store/BookingStore"
import { ScheduleForm } from "../form/blocks/ScheduleForm/ScheduleForm"

const BookingScreen1 = () => {
  const bookingData = useBookingStore(state => state.bookingData)

  const form = useForm({
    resolver: yupResolver(ScreenSchema1),
    defaultValues: {
      dateFrom: bookingData.dateFrom || "",
      dateTo: bookingData.dateTo || "",
      timeFrom: bookingData.timeFrom || "",
      timeTo: bookingData.timeTo || "",
      daysAmount: bookingData.daysAmount || 0,
    },
  })

  return (
    <BookingModal isDirty={form.formState.isDirty} onSubmit={form.handleSubmit}>
      <ScheduleForm form={form} bookingData={bookingData} />
    </BookingModal>
  )
}

export default BookingScreen1
