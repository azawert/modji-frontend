import { useQuery } from "@tanstack/react-query"

import { getPetById } from "@/generated/pets"

import { EQueryKeys } from "./keys"

export const useGetPetById = (id: number) =>
  useQuery({
    queryKey: [EQueryKeys.GET_PET_BY_ID + id],
    queryFn: () => getPetById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    enabled: !!id,
  })
