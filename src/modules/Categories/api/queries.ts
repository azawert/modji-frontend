import { useQuery } from "@tanstack/react-query"

import { getAllCategories } from "@/generated/categories"

import { EQueryKeys } from "./keys"

export const useGetCategories = () =>
  useQuery({
    queryKey: [EQueryKeys.GET_ALL_CATEGORIES],
    queryFn: () => getAllCategories({ headers: { "X-PetHotel-User-Id": 1 } }),
  })
