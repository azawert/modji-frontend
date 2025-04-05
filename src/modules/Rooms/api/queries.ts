import { useQuery } from "@tanstack/react-query"

import {
  RoomDto,
  checkUniqueRoomNumber,
  getAllRooms,
  getRoomById,
} from "@/generated/room"

import { EQueryKeys } from "./keys"

export const useGetAllRooms = (key: string) =>
  useQuery({
    queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${key}`],
    queryFn: () =>
      getAllRooms(
        { isVisible: key !== "Удаленные" },
        { headers: { "X-PetHotel-User-Id": 1 } },
      ) as Promise<RoomDto[]>,
  })

export const useGetRoomById = (id: number) =>
  useQuery({
    queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${id}`],
    queryFn: () => getRoomById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
  })

export const useCheckUniqueRoomNumber = (
  roomNumber: string,
  enabled?: boolean,
) => {
  return useQuery({
    queryKey: [EQueryKeys.CHECK_UNIQUE_ROOM_NUMBER, roomNumber],
    queryFn: () =>
      checkUniqueRoomNumber(
        { roomNumber },
        { headers: { "X-PetHotel-User-Id": 1 } },
      ),
    enabled: !!roomNumber?.length && enabled,
    staleTime: 0,
  })
}
