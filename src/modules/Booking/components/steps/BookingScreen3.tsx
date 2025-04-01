import { yupResolver } from "@hookform/resolvers/yup"
import { BookingModal } from "../modal/BookingModal/BookingModal"
import { useForm, UseFormReturn } from "react-hook-form"
import {
  ICategoryAndRoom,
  IScheduleForm,
  ScreenSchema3,
} from "../../model/types/BookingValidationSchema"
import useBookingStore from "../../store/BookingStore"
import { CategoryRoomsForm } from "../form/blocks/CategoryForm/CategoryRoomsForm"
import { ScheduleForm } from "../form/blocks/ScheduleForm/ScheduleForm"
import { StepTitle } from "../typography/StepTitle/StepTitle"
import { useGetIsDatesAvailable } from "../../api/queries"
import ErrorBar from "@/shared/ui/ErrorBar/ErrorBar"
import { ErrorMessages } from "../../consts/errors"

const BookingScreen3 = () => {
  const bookingData = useBookingStore(state => state.bookingData)
  const room = useBookingStore(state => state.room)

  const { failureReason } = useGetIsDatesAvailable(
    Number(room?.id),
    bookingData.dateFrom!,
    bookingData.dateTo!
  )

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
  const disabled = failureReason?.response?.data?.message

  return (
    <BookingModal
      isDirty={true}
      onSubmit={form.handleSubmit}
      isReadyToSubmit={disabled}
    >
      <StepTitle title="Шаг 2: Категория и комната" />
      <CategoryRoomsForm
        form={form as unknown as UseFormReturn<ICategoryAndRoom>}
        bookingData={bookingData}
      />
      <ScheduleForm
        bookingData={bookingData}
        form={form as unknown as UseFormReturn<IScheduleForm>}
      />
      {disabled && (
        <div className="py-4">
          <ErrorBar
            body={ErrorMessages.NO_ROOMS}
            style="Red"
            title={ErrorMessages.NO_ROOMS_TITLE}
          />
        </div>
      )}
    </BookingModal>
  )
}

export default BookingScreen3
