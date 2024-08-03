import { useMutation, useQueryClient } from "@tanstack/react-query"
import { mutationKeys, queryKeys } from "./keys"
import { UserDto, addUser, deleteUserById, updateUser } from "@/generated/user"
import { useAddErrorNotification } from "@/shared/utils/utils"

export const useCreateNewUser = () => {
  const addErrorNotification = useAddErrorNotification()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [mutationKeys.CREATE_NEW_USER],
    mutationFn: (data: UserDto) =>
      addUser(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_USERS] })
    },
    onError: e => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (e?.response?.status === 409) {
        addErrorNotification(
          "Сотрудник с таким адресом электронной почты уже существует в системе"
        )
      } else {
        addErrorNotification("Произошла непредвиденная ошибка")
      }
      return
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [mutationKeys.DELETE_USER],
    mutationFn: (id: number) =>
      deleteUserById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_USERS] })
    },
  })
}

export const useEditUser = () => {
  const queryClient = useQueryClient()
  const addErrorNotification = useAddErrorNotification()
  return useMutation({
    mutationKey: [mutationKeys.EDIT_USER],
    mutationFn: (data: UserDto) =>
      updateUser(data.id!, data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_ALL_USERS] })
    },
    onError: e => {
      // TODO: после правок от бека с ошибками, наладить типизацию ошибок во всем проекте и убрать @ts-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (e?.response?.status === 409) {
        addErrorNotification(
          "Сотрудник с таким адресом электронной почты уже существует в системе"
        )
      } else {
        addErrorNotification("Произошла непредвиденная ошибка")
      }
      return
    },
  })
}
