import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import { getAllCategories } from "@/generated/categories"

export const useGetCategories = () =>
  useQuery({
    queryKey: [EQueryKeys.GET_ALL_CATEGORIES],
    queryFn: () => getAllCategories({ headers: { "X-PetHotel-User-Id": 1 } }),
  })
