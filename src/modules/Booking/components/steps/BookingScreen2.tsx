import { useForm } from "react-hook-form"
import { BookingModal } from "../modal/BookingModal/BookingModal"
import { yupResolver } from "@hookform/resolvers/yup"
import { ScreenSchema2 } from "../../model/types/BookingValidationSchema"
import useBookingStore from "../../store/BookingStore"
import { CategoryRoomsForm } from "../form/blocks/CategoryForm/CategoryRoomsForm"
import { StepTitle } from "../typography/StepTitle/StepTitle"

const BookingScreen2 = () => {
  const bookingData = useBookingStore(state => state.bookingData)

  const form = useForm({
    resolver: yupResolver(ScreenSchema2),
    defaultValues: {
      categories: bookingData.categories || "",
      rooms: bookingData.rooms || "",
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
