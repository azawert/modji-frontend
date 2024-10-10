import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EMutationKeys, EQueryKeys } from "./keys"
import {
  NewCategoryDto,
  UpdateCategoryDto,
  addCategory,
  deleteCategoryById,
  updateCategoryById,
} from "@/generated/categories"
import {
  addErrorNotification,
  addSuccessNotification,
} from "@/shared/utils/utils"

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const errorNotification = addErrorNotification()
  const successNotification = addSuccessNotification()
  return useMutation({
    mutationKey: [EMutationKeys.CREATE_CATEGORY],
    mutationFn: (data: NewCategoryDto) =>
      addCategory(data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onError: () => {
      errorNotification("При создании категории произошла ошибка.")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_ALL_CATEGORIES],
      })
      successNotification("Категория успешно создана!")
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  const errorNotification = addErrorNotification()
  const successNotification = addSuccessNotification()
  return useMutation({
    mutationKey: [EMutationKeys.UPDATE_CATEGORY],
    mutationFn: ({ data, id }: { data: UpdateCategoryDto; id: number }) =>
      updateCategoryById(id, data, { headers: { "X-PetHotel-User-Id": 1 } }),
    onError: () => {
      errorNotification("При обновлении категории произошла ошибка.")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_ALL_CATEGORIES],
      })
      successNotification("Категория успешно обновлена!")
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const errorNotification = addErrorNotification()
  const successNotification = addSuccessNotification()
  return useMutation({
    mutationKey: [EMutationKeys.DELETE_CATEGORY],
    mutationFn: (id: number) =>
      deleteCategoryById(id, { headers: { "X-PetHotel-User-Id": 1 } }),
    onError: e => {
      if (e?.response?.status === 409) return
      errorNotification("При удалении категории произошла ошибка.")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_ALL_CATEGORIES],
      })
      successNotification("Категория успешно удалена!")
    },
  })
}
