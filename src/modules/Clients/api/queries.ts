import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./keys"
import { getAllOwners, getOwnerById } from "@/generated/owners"

export const useGetAllClients = () =>
  useQuery({
    queryKey: [queryKeys.GET_ALL_CLIENTS],
    queryFn: () => getAllOwners({ headers: { "X-PetHotel-User-Id": 1 } }),
  })

export const useGetClientById = (id: number) =>
  useQuery({
    queryKey: [queryKeys.GET_CLIENT_BY_ID + id],
    queryFn: () => getOwnerById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
