import { useCallback, useState } from "react"
import { CategoriesTitle } from "../components/CategoriesTitle"
import { TOpenModal } from "@/shared/types/types"
import { useGetCategories } from "../api/queries"
import { CategoriesPageBody } from "../components/CategoriesPageBody"
import { CategoryCreateOrEditModal } from "../components/CategoryCreateOrEditModal"
import { useForm } from "react-hook-form"
import { TCategoryForm } from "../const"
import { CategoryDto } from "@/generated/categories"
import { CategoriesDeleteModal } from "../components/CategoriesDeleteModal"
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../api/mutation"
import {
  mapperCategoryFormToAnCreateRequest,
  mapperCategoryFromToAnUpdateRequest,
} from "../utils"
import { useAddWarningNotification } from "@/shared/utils/utils"
import { useNavigate } from "react-router-dom"

type TDeleteModalData = {
  name: string
  description: string
  id?: number
}

export const CategoriesPage: React.FC = () => {
  const addWarningNotification = useAddWarningNotification()
  const navigate = useNavigate()
  const [isCreateOrEditModalOpen, setIsCreateOrEditModalOpen] =
    useState<TOpenModal>({ isOpen: false, isEdit: false })
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState<TDeleteModalData>({
    name: "",
    description: "",
  })
  const [editModalData, setEditModalData] = useState<CategoryDto>()
  const form = useForm<TCategoryForm>({
    mode: "all",
    defaultValues: {
      description: "",
      name: "",
    },
  })
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategories()
  const { mutate: deleteCategory } = useDeleteCategory()
  const { mutate: createCategory } = useCreateCategory()
  const { mutate: updateCategory } = useUpdateCategory()

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateOrEditModalOpen({ isOpen: true, isEdit: false })
  }, [])
  const handleOpenEditModal = useCallback((category: CategoryDto) => {
    setIsCreateOrEditModalOpen({ isOpen: true, isEdit: true })
    setEditModalData(prev => ({ ...prev, ...category }))
  }, [])

  const handleCloseCreateOrEditModal = useCallback(() => {
    setIsCreateOrEditModalOpen(prev => ({ ...prev, isOpen: false }))
    form.reset()
    form.clearErrors()
  }, [form])

  const handleDeleteModalOpened = useCallback((category: CategoryDto) => {
    setIsDeleteModalOpened(true)
    setDeleteModalData(prev => ({ ...prev, ...category }))
  }, [])
  const handleDeleteModalClosed = useCallback(() => {
    setIsDeleteModalOpened(false)
  }, [])
  const handleNavigateToRoomPage = useCallback(() => {
    navigate("/rooms")
  }, [navigate])

  const handleClickDeleteCategory = useCallback(() => {
    if (!deleteModalData.id) return
    deleteCategory(deleteModalData.id, {
      onSuccess: () => {
        setIsDeleteModalOpened(false)
      },
      onError: e => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (e?.response?.status === 409) {
          addWarningNotification(
            `Удаление категории ${deleteModalData.name} невозможно из-за наличия номеров данной категории`,
            handleNavigateToRoomPage,
            "Перейти в раздел Номера"
          )
        }
        setIsDeleteModalOpened(false)
      },
    })
  }, [
    deleteModalData.id,
    deleteCategory,
    addWarningNotification,
    handleNavigateToRoomPage,
    deleteModalData.name,
  ])

  const handleCreateOrUpdateCategory = useCallback(
    (category: TCategoryForm) => {
      isCreateOrEditModalOpen.isEdit
        ? updateCategory(
            {
              data: mapperCategoryFromToAnUpdateRequest(category),
              id: editModalData?.id || 0,
            },
            {
              onSuccess: () => {
                handleCloseCreateOrEditModal()
              },
            }
          )
        : createCategory(mapperCategoryFormToAnCreateRequest(category), {
            onSuccess: () => {
              handleCloseCreateOrEditModal()
            },
            onError: e => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              if (e?.response?.status === 409) {
                form.setError("name", {
                  message:
                    "Данная категория уже существует. Введите уникальное название.",
                })
              }
            },
          })
    },
    [
      createCategory,
      editModalData?.id,
      form,
      handleCloseCreateOrEditModal,
      isCreateOrEditModalOpen.isEdit,
      updateCategory,
    ]
  )

  return (
    <>
      <CategoriesTitle onClick={handleOpenCreateModal} />
      <CategoriesPageBody
        isLoading={isCategoriesLoading}
        categories={categories || []}
        handleOpenDeleteCategoryModal={handleDeleteModalOpened}
        handleOpenEditCategoryModal={handleOpenEditModal}
      />
      <CategoryCreateOrEditModal
        form={form}
        handleFormSubmit={handleCreateOrUpdateCategory}
        isOpen={isCreateOrEditModalOpen.isOpen}
        onClose={handleCloseCreateOrEditModal}
        isEditing={isCreateOrEditModalOpen.isEdit}
        isLoading={form.formState.isLoading}
        categoryData={editModalData}
      />
      <CategoriesDeleteModal
        isOpen={isDeleteModalOpened}
        onCancel={handleDeleteModalClosed}
        onConfirm={handleClickDeleteCategory}
        categoryDescription={deleteModalData.description}
        categoryName={deleteModalData.name}
      />
    </>
  )
}
