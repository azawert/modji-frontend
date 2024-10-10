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
  addErrorNotification,
  addSuccessNotification,
} from "@/shared/utils/utils"

export const useCreateRoom = () => {
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  return useMutation({
    mutationKey: [EMutationKeys.CREATE_ROOM],
    mutationFn: (data: NewRoomDto) =>
      addRoom(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      successNotification("Комната успешно создана")
    },
    onError: () => {
      errorNotification("Ошибка при создании комнаты")
    },
  })
}

export const useHideRoom = () => {
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  return useMutation({
    mutationFn: (id: number) =>
      hideRoomById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    mutationKey: [EMutationKeys.DELETE_ROOM],
    onSuccess: () => {
      successNotification("Номер перенесен в раздел Удаленных номеров")
    },
    onError: () => {
      errorNotification("Ошибка при удалении номера")
    },
  })
}

export const useUnHideRoom = () => {
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  return useMutation({
    mutationKey: [EMutationKeys.UNHIDE_ROOM],
    mutationFn: (id: number) =>
      unhideRoomById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    onError: () => {
      errorNotification("Ошибка при восстановлении номера")
    },
    onSuccess: () => {
      successNotification("Номер перенесен в раздел Действующих номеров")
    },
  })
}

export const useUpdateRoom = () => {
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoomDto }) =>
      updateRoom(id, data, { headers: { "X-PetHotel-User-Id": 1 } }),
    mutationKey: [EMutationKeys.UPDATE_ROOM],
    onSuccess: () => {
      successNotification("Номер успешно обновлен")
    },
    onError: () => {
      errorNotification("Ошибка при обновлении номера")
    },
  })
}
