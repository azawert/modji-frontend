import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import { RoomDto, checkUniqueRoomNumber, getAllRooms } from "@/generated/room"
export const useGetAllRooms = (key: string) =>
  useQuery({
    queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${key}`],
    queryFn: () =>
      getAllRooms(
        { isVisible: key !== "Удаленные" },
        { headers: { "X-PetHotel-User-Id": 1 } }
      ) as Promise<RoomDto[]>,
  })

export const useCheckUniqueRoomNumber = (
  roomNumber: string,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: [EQueryKeys.CHECK_UNIQUE_ROOM_NUMBER, roomNumber],
    queryFn: () =>
      checkUniqueRoomNumber(
        { roomNumber },
        { headers: { "X-PetHotel-User-Id": 1 } }
      ),
    enabled: !!roomNumber?.length && enabled,
    staleTime: 0,
  })
}
