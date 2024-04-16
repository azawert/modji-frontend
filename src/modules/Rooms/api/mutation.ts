import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EMutationKeys, EQueryKeys } from "./keys"
import { NewRoomDto, addRoom } from "@/generated/room"
import { useAddSuccessNotification } from "@/shared/utils/utils"

export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  const addSuccessNotification = useAddSuccessNotification()
  return useMutation({
    mutationKey: [EMutationKeys.CREATE_ROOM],
    mutationFn: (data: NewRoomDto) =>
      addRoom(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      addSuccessNotification("Комната успешно создана")
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_ALL_ROOMS] })
    },
  })
}
