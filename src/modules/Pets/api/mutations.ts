import { useMutation, useQueryClient } from "@tanstack/react-query"

import { EQueryKeys } from "@/modules/Clients/api/keys"
import { EQueryKeys as EPetQueryKeys } from "@/modules/Pets/api/keys"

import { NewPetDto, UpdatePetDto, addPet, updatePet } from "@/generated/pets"

import { EMutationKeys } from "./keys"

export const useCreatePet = (clientId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EMutationKeys.CREATE_PET],
    mutationFn: (data: NewPetDto) =>
      addPet(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_CLIENT_BY_ID + clientId],
      })
    },
  })
}

export const useUpdatePet = (petId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [EMutationKeys.UPDATE_PET, petId],
    mutationFn: (data: UpdatePetDto) =>
      updatePet(petId, data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: updatedPet => {
      queryClient.setQueryData(
        [EPetQueryKeys.GET_PET_BY_ID + petId],
        updatedPet,
      )
    },
  })
}
