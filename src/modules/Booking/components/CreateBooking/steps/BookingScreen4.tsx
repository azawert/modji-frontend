import { yupResolver } from "@hookform/resolvers/yup"
import { UseFormReturn, useForm } from "react-hook-form"

import ErrorBar from "@/shared/ui/ErrorBar/ErrorBar"

import { ErrorMessages } from "../../../consts/errors"
import {
  ICategoryAndRoom,
  IPet,
  IScheduleForm,
  ScreenSchema3WithPets,
} from "../../../model/types/BookingValidationSchema"
import useBookingStore from "../../../store/BookingStore"
import { CategoryRoomsForm } from "../form/blocks/CategoryForm/CategoryRoomsForm"
import { PetOwnerForm } from "../form/blocks/PetOwnerForm/PetOwnerForm"
import { ScheduleForm } from "../form/blocks/ScheduleForm/ScheduleForm"
import { BookingModal } from "../modal/BookingModal/BookingModal"

const BookingScreen4 = () => {
  const bookingData = useBookingStore(state => state.bookingData)

  const form = useForm({
    resolver: yupResolver(ScreenSchema3WithPets),
    defaultValues: {
      categories: bookingData.categories || "",
      rooms: bookingData.rooms || "",
      dateFrom: bookingData.dateFrom || "",
      dateTo: bookingData.dateTo || "",
      timeFrom: bookingData.timeFrom || "",
      timeTo: bookingData.timeTo || "",
      daysAmount: bookingData.daysAmount || 0,
      petIds: bookingData.petIds || [],
    },
    mode: "onSubmit",
  })

  const noPets = Boolean(form.formState.errors.petIds?.message)

  return (
    <BookingModal isDirty={true} onSubmit={form.handleSubmit}>
      <div className="flex flex-col">
        {noPets && (
          <div className="py-4">
            <ErrorBar
              title={ErrorMessages.NO_PETS_TITLE}
              body={ErrorMessages.NO_PETS}
              style="Red"
            />
          </div>
        )}
        <CategoryRoomsForm
          bookingData={bookingData}
          form={form as unknown as UseFormReturn<ICategoryAndRoom>}
        />
        <ScheduleForm
          bookingData={bookingData}
          form={form as unknown as UseFormReturn<IScheduleForm>}
        />
        <PetOwnerForm
          bookingData={bookingData}
          form={form as unknown as UseFormReturn<IPet>}
        />
      </div>
    </BookingModal>
  )
}

export default BookingScreen4
