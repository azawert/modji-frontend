import { useMutation } from "@tanstack/react-query"
import { EMutationKeys } from "./keys"
import {
  NewRoomDto,
  UpdateRoomDto,
  addRoom,
  hideRoomById,
  unhideRoomById,
  updateRoom,
} from "@/generated/room"
import {
  useAddErrorNotification,
  useAddSuccessNotification,
} from "@/shared/utils/utils"

export const useCreateRoom = () => {
  const addSuccessNotification = useAddSuccessNotification()
  const addErrorNotification = useAddErrorNotification()
  return useMutation({
    mutationKey: [EMutationKeys.CREATE_ROOM],
    mutationFn: (data: NewRoomDto) =>
      addRoom(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      addSuccessNotification("Комната успешно создана")
    },
    onError: () => {
      addErrorNotification("Ошибка при создании комнаты")
    },
  })
}

export const useHideRoom = () => {
  const addSuccessNotification = useAddSuccessNotification()
  const addErrorNotification = useAddErrorNotification()
  return useMutation({
    mutationFn: (id: number) =>
      hideRoomById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    mutationKey: [EMutationKeys.DELETE_ROOM],
    onSuccess: () => {
      addSuccessNotification("Номер перенесен в раздел Удаленных номеров")
    },
    onError: () => {
      addErrorNotification("Ошибка при удалении номера")
    },
  })
}

export const useUnHideRoom = () => {
  const addSuccessNotification = useAddSuccessNotification()
  const addErrorNotification = useAddErrorNotification()
  return useMutation({
    mutationKey: [EMutationKeys.UNHIDE_ROOM],
    mutationFn: (id: number) =>
      unhideRoomById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    onError: () => {
      addErrorNotification("Ошибка при восстановлении номера")
    },
    onSuccess: () => {
      addSuccessNotification("Номер перенесен в раздел Действующих номеров")
    },
  })
}

export const useUpdateRoom = () => {
  const addSuccessNotification = useAddSuccessNotification()
  const addErrorNotification = useAddErrorNotification()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomDto }) =>
      updateRoom(id, data, { headers: { "X-PetHotel-User-Id": 1 } }),
    mutationKey: [EMutationKeys.UPDATE_ROOM],
    onSuccess: () => {
      addSuccessNotification("Номер успешно обновлен")
    },
    onError: () => {
      addErrorNotification("Ошибка при обновлении номера")
    },
  })
}
