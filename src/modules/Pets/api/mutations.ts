import { useMutation } from "@tanstack/react-query"
import { EMutationKeys } from "./keys"
import { addPet, NewPetDto } from "@/generated/pets"

export const useCreatePet = () =>
  useMutation({
    mutationKey: [EMutationKeys.CREATE_PET],
    mutationFn: (data: NewPetDto) =>
      addPet(data, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
