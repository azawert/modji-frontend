import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import { RoomDto, getAllRooms } from "@/generated/room"
import { AxiosResponse } from "axios"

export const useGetAllRooms = (key: string) =>
  useQuery({
    queryKey: [`${EQueryKeys.GET_ALL_ROOMS} ${key}`],
    queryFn: () =>
      getAllRooms(
        { isVisible: key === "Удаленные" ? false : true },
        { headers: { "X-PetHotel-User-Id": 1 } }
      ) as Promise<AxiosResponse<RoomDto[]>>,
  })
