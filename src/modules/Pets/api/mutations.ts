import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPet, NewPetDto } from "@/generated/pets"
import { EMutationKeys } from "./keys"
import { EQueryKeys } from "@/modules/Clients/api/keys"

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
