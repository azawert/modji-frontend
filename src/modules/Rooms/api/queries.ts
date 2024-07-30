import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import { RoomDto, checkUniqueRoomNumber, getAllRooms } from "@/generated/room"
import { AxiosResponse } from "axios"

export const useGetAllRooms = (key: string) =>
  useQuery({
    queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${key}`],
    queryFn: () =>
      getAllRooms(
        { isVisible: key !== "Удаленные" },
        { headers: { "X-PetHotel-User-Id": 1 } }
      ) as Promise<AxiosResponse<RoomDto[]>>,
  })

export const useCheckUniqueRoomNumber = (roomNumber: string) => {
  return useQuery({
    queryKey: [EQueryKeys.CHECK_UNIQUE_ROOM_NUMBER, roomNumber],
    queryFn: () =>
      checkUniqueRoomNumber(
        { roomNumber },
        { headers: { "X-PetHotel-User-Id": 1 } }
      ),
    enabled: !!roomNumber?.length,
    staleTime: 0,
  })
}
