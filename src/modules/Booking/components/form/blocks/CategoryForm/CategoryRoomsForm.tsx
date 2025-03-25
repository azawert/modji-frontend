import {
  Controller,
  DeepPartial,
  UseFormReturn,
  useWatch,
} from "react-hook-form"
import { CategorySelect } from "../../fields/CategorySelect/CategorySelect"
import { RoomSelect } from "../../fields/RoomSelect/RoomSelect"
import {
  IBookingForm,
  ICategoryAndRoom,
} from "@/modules/Booking/model/types/BookingValidationSchema"
import { useGetAllRooms } from "@/modules/Rooms/api/queries"
import { useGetCategories } from "@/modules/Categories/api/queries"
import { useMemo } from "react"
import useBookingStore from "@/modules/Booking/store/BookingStore"

interface CategoryRoomsProps {
  form: UseFormReturn<ICategoryAndRoom>
  bookingData: DeepPartial<IBookingForm>
}

export const CategoryRoomsForm = (props: CategoryRoomsProps) => {
  const { form, bookingData } = props
  const {
    formState: { errors, dirtyFields },
    control,
    resetField,
  } = form

  const setBookingData = useBookingStore(state => state.setBookingData)
  const { data: rooms, isError: isErrorRooms } = useGetAllRooms("booking")
  const { data: categories, isError: isErrorCategories } = useGetCategories()
  const { categories: categoryValue } = useWatch({ control })

  const filteredRooms = useMemo(() => {
    resetField("rooms")
    setBookingData({ ...bookingData, rooms: "" })
    const filtered = rooms?.filter(
      room => room.categoryDto?.name === categoryValue
    )

    return filtered
  }, [rooms, categoryValue, resetField])

  return (
    <section className="flex justify-between">
      <Controller
        control={control}
        name="categories"
        render={({ field }) => {
          return (
            <CategorySelect
              className="w-64"
              onChange={field.onChange}
              value={field.value || bookingData.categories || ""}
              error={errors?.categories?.message}
              categories={categories || []}
              isErrorRequest={isErrorCategories}
            />
          )
        }}
      />

      <Controller
        control={control}
        name="rooms"
        disabled={!filteredRooms?.length}
        render={({ field }) => {
          if (dirtyFields.categories || bookingData.categories?.length) {
            return (
              <RoomSelect
                className="w-64"
                onChange={field.onChange}
                value={field.value || bookingData.rooms || ""}
                error={errors?.rooms?.message}
                rooms={filteredRooms || []}
                isErrorRequest={isErrorRooms}
                disabled={!filteredRooms?.length}
              />
            )
          }
          return <></>
        }}
      />
    </section>
  )
}
