import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { ScreenSchema2 } from "../../../model/types/BookingValidationSchema"
import useBookingStore from "../../../store/BookingStore"
import { StepTitle } from "../../typography/StepTitle/StepTitle"
import { CategoryRoomsForm } from "../form/blocks/CategoryForm/CategoryRoomsForm"
import { BookingModal } from "../modal/BookingModal/BookingModal"

const BookingScreen2 = () => {
  const bookingData = useBookingStore(state => state.bookingData)
  const { categories, rooms } = bookingData

  const form = useForm({
    resolver: yupResolver(ScreenSchema2),
    defaultValues: {
      categories: categories || "",
      rooms: rooms || "",
    },
  })

  return (
    <BookingModal isDirty={true} onSubmit={form.handleSubmit}>
      <StepTitle title="Шаг 2: Категория и комната" />
      <CategoryRoomsForm form={form} bookingData={bookingData} />
    </BookingModal>
  )
}

export default BookingScreen2
