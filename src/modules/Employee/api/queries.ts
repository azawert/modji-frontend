import { useQuery } from "@tanstack/react-query"

import { getAllUsers } from "@/generated/user"

import { queryKeys } from "./keys"

export const useGetAllUsers = () =>
  useQuery({
    queryKey: [queryKeys.GET_ALL_USERS],
    queryFn: () => getAllUsers({}, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
