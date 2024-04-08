import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./keys"
import { getAllUsers } from "@/generated/user"

export const useGetAllUsers = () =>
  useQuery({
    queryKey: [queryKeys.GET_ALL_USERS],
    queryFn: () => getAllUsers({}, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
