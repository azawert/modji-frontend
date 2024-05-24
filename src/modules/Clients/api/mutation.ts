import { useMutation } from "@tanstack/react-query"
import { EMutationKeys } from "./keys"
import { NewOwnerDto, addOwner } from "@/generated/owners"

export const useCreateClient = () =>
  useMutation({
    mutationKey: [EMutationKeys.CREATE_CLIENTS],
    mutationFn: (data: NewOwnerDto) =>
      addOwner(data, { headers: { "X-PetHotel-User-Id": 1 } }),
  })
