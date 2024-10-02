import { Controller, DeepPartial, UseFormReturn } from "react-hook-form"
import { CategorySelect } from "../../fields/CategorySelect/CategorySelect"
import { RoomSelect } from "../../fields/RoomSelect/RoomSelect"
import {
  IBookingForm,
  ICategoryAndRoom,
} from "@/modules/Booking/model/types/BookingValidationSchema"

interface CategoryRoomsProps {
  form: UseFormReturn<ICategoryAndRoom>
  bookingData: DeepPartial<IBookingForm>
}

export const CategoryRoomsForm = (props: CategoryRoomsProps) => {
  const { form, bookingData } = props
  const {
    formState: { errors, dirtyFields },
    control,
  } = form

  return (
    <section className="flex gap-6">
      <Controller
        control={control}
        name="categories"
        render={({ field }) => {
          return (
            <CategorySelect
              className="w-64"
              onChange={field.onChange}
              value={bookingData.categories || field.value || ""}
              error={errors?.categories?.message}
            />
          )
        }}
      />
      <Controller
        control={control}
        name="rooms"
        render={({ field }) => {
          if (dirtyFields.categories || bookingData.categories?.length) {
            return (
              <RoomSelect
                className="w-64"
                onChange={field.onChange}
                value={bookingData.rooms || field.value || ""}
                error={errors?.rooms?.message}
              />
            )
          }
          return <></>
        }}
      />
    </section>
  )
}
