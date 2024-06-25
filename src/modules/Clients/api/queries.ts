import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./keys"
import { getAllOwners } from "@/generated/owners"

export const useGetAllClients = () =>
  useQuery({
    queryKey: [queryKeys.GET_ALL_CLIENTS],
    queryFn: () => getAllOwners({ headers: { "X-PetHotel-User-Id": 1 } }),
  })
