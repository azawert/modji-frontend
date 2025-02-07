import { useMutation } from "@tanstack/react-query"
import { EMutationKeys } from "./keys"
import { addPet, NewPetDto } from "@/generated/pets"
import { useGetClientById } from "@/modules/Clients/api/queries"

export const useCreatePet = (userId: number) => {
  const { refetch } = useGetClientById(userId)

  return useMutation({
    mutationKey: [EMutationKeys.CREATE_PET],
    mutationFn: (data: NewPetDto) =>
      addPet(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      refetch()
    },
  })
}
