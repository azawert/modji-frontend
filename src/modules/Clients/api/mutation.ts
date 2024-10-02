import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EMutationKeys, EQueryKeys } from "./keys"
import { NewOwnerDto, addOwner } from "@/generated/owners"

export const useCreateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [EMutationKeys.CREATE_CLIENTS],
    mutationFn: (data: NewOwnerDto) =>
      addOwner(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_ALL_CLIENTS]
      })
    }
  })
}
