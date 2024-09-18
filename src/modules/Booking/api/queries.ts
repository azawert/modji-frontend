import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import { checkRoomAvailableInDates, getBookingById } from "@/generated/bookings"
import { mapperBookingDTOToFormData } from "../model/utils"

export const useGetBookingById = (id: number) =>
  useQuery({
    queryKey: [EQueryKeys.GET_BOOKING_BY_ID],
    queryFn: () =>
      getBookingById(id, { headers: { "X-PetHotel-User-Id": 1 } }).then(res =>
        mapperBookingDTOToFormData(res.data)
      ),
  })

export const useGetIsDatesAvailable = (
  roomId: number,
  checkInDate: string,
  checkOutDate: string
) =>
  useQuery({
    queryKey: [EQueryKeys.GET_BOOKING_BY_ID],
    queryFn: () =>
      checkRoomAvailableInDates(
        roomId,
        {
          checkInDate,
          checkOutDate,
        },
        {
          headers: { "X-PetHotel-User-Id": 1 },
        }
      ),
    enabled: !!roomId && !!checkInDate && !!checkOutDate,
  })
