import { useQuery } from "@tanstack/react-query"
import { EQueryKeys } from "./keys"
import { getPetById } from "@/generated/pets"

export const useGetPetById = (id: number) =>
  useQuery({
    queryKey: [EQueryKeys.GET_PET_BY_ID + id],
    queryFn: () => getPetById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    enabled: !!id,
  })
