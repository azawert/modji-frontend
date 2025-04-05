import { useMutation } from "@tanstack/react-query"

import { NewBookingDto, addBooking } from "@/generated/bookings"

import { EMutationKeys } from "./keys"

export const useCreateBooking = () =>
  useMutation({
    mutationKey: [EMutationKeys.CREATE_BOOKING],
    mutationFn: (data: NewBookingDto) =>
      addBooking(data, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
