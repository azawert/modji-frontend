import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import {
  getAllOwners,
  getOwnerById,
  searchOwner,
  SearchOwnerDirection,
} from "@/generated/owners"

export const useGetAllClients = () =>
  useQuery({
    queryKey: [EQueryKeys.GET_ALL_CLIENTS],
    queryFn: () => getAllOwners({ headers: { "X-PetHotel-User-Id": 1 } }),
  })

export const useGetSuggestedClients = (
  wanted: string,
  direction: SearchOwnerDirection
) =>
  useQuery({
    queryKey: [EQueryKeys.GET_SUGGESTED_CLIENTS + wanted],
    queryFn: () =>
      searchOwner(
        { wanted },
        { direction },
        { headers: { "X-PetHotel-User-Id": 1 } }
      ).then(res => res.data),
    enabled: !!wanted,
  })

export const useGetClientById = (id: number) =>
  useQuery({
    queryKey: [EQueryKeys.GET_CLIENT_BY_ID + id],
    queryFn: () =>
      getOwnerById(id, { headers: { "X-PetHotel-User-Id": 1 } }).then(
        res => res.data
      ),
    enabled: !!id,
  })
