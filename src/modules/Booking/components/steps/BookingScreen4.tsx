import { yupResolver } from "@hookform/resolvers/yup"
import { BookingModal } from "../modal/BookingModal/BookingModal"
import { useForm, UseFormReturn } from "react-hook-form"
import {
  ICategoryAndRoom,
  IScheduleForm,
  ScreenSchema3,
} from "../../model/types/BookingValidationSchema"
import useBookingStore from "../../store/BookingStore"
import { PetOwnerForm } from "../form/blocks/PetOwnerForm/PetOwnerForm"
import { CategoryRoomsForm } from "../form/blocks/CategoryForm/CategoryRoomsForm"
import { ScheduleForm } from "../form/blocks/ScheduleForm/ScheduleForm"
const BookingScreen4 = () => {
  const bookingData = useBookingStore(state => state.bookingData)

  const form = useForm({
    resolver: yupResolver(ScreenSchema3),
    defaultValues: {
      categories: bookingData.categories || "",
      rooms: bookingData.rooms || "",
      dateFrom: bookingData.dateFrom || "",
      dateTo: bookingData.dateTo || "",
      timeFrom: bookingData.timeFrom || "",
      timeTo: bookingData.timeTo || "",
      daysAmount: bookingData.daysAmount || 0,
    },
  })

  return (
    <BookingModal isDirty={true} onSubmit={form.handleSubmit}>
      <div className="flex flex-col">
        <CategoryRoomsForm
          bookingData={bookingData}
          form={form as unknown as UseFormReturn<ICategoryAndRoom>}
        />
        <ScheduleForm
          bookingData={bookingData}
          form={form as unknown as UseFormReturn<IScheduleForm>}
        />
        <PetOwnerForm />
      </div>
    </BookingModal>
  )
}

export default BookingScreen4
