import { useMutation } from "@tanstack/react-query"
import { EMutationKeys } from "./keys"
import { addBooking, NewBookingDto } from "@/generated/bookings"

export const useCreateBooking = () =>
  useMutation({
    mutationKey: [EMutationKeys.CREATE_BOOKING],
    mutationFn: (data: NewBookingDto) =>
      addBooking(data, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
