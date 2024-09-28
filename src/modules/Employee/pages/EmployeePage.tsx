import { EmployeePageBody } from "../components/EmployeePageBody"
import { EmployeePageTitle } from "../components/EmployeePageTitle"
import { useCallback, useState } from "react"
import { EmployeeCreateOrEditModal } from "../components/EmployeeCreateOrEditModal"
import { useGetAllUsers } from "../api/queries"
import { useCreateNewUser, useDeleteUser, useEditUser } from "../api/mutation"
import { useForm } from "react-hook-form"
import { DEFAULT_VALUES_FOR_CREATE_USER_FORM, TCreateUser } from "../const"
import { UserDto } from "@/generated/user"
import { getFullName, roleMapperForRussianLanguage } from "../utils"
import { EmployeeDeleteModal } from "../components/EmployeeDeleteModal"
import { TOpenModal } from "@/shared/types/types"

type TModalDeleteData = {
  employeeName: string
  employeeRole: string
  employeeId: number
}
export const EmployeePage: React.FC = () => {
  const { data: employees, isLoading: isEmployeeListLoading } = useGetAllUsers()
  const { mutate: createUser } = useCreateNewUser()
  const { mutate: deleteUser } = useDeleteUser()
  const { mutate: editUser } = useEditUser()
  const [isOpenedCreateOrEditModal, setIsOpenedCreateOrEditModal] =
    useState<TOpenModal>({ isEdit: false, isOpen: false })
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState<TModalDeleteData>()
  const [editModalData, setEditModalData] = useState<UserDto>()

  const form = useForm<TCreateUser>({
    defaultValues: DEFAULT_VALUES_FOR_CREATE_USER_FORM,
    mode: "all",
  })

  const handleOpenCreateModal = useCallback(() => {
    setIsOpenedCreateOrEditModal(prev => ({
      ...prev,
      isOpen: true,
      isEdit: false,
    }))
  }, [])
  const handleCloseCreateOrEditModal = useCallback(() => {
    setIsOpenedCreateOrEditModal(prev => ({
      ...prev,
      isOpen: false,
    }))
    form.clearErrors()
    form.reset()
  }, [form])

  const handleOpenDeleteModal = useCallback((employee: UserDto) => {
    setIsOpenedDeleteModal(true)
    setDeleteModalData(prev => ({
      ...prev,
      employeeId: employee.id || 0, //по идее тут никогда не будет 0, потому что мы будем передавать айди всегда, но модель данных такова, что id там необязательный параметр
      employeeName: getFullName(
        employee.firstName,
        employee.lastName,
        employee.middleName
      ),
      employeeRole: roleMapperForRussianLanguage[employee.role],
    }))
  }, [])

  const handleOpenEditModal = useCallback((employee: UserDto) => {
    setIsOpenedCreateOrEditModal(prev => ({
      ...prev,
      isEdit: true,
      isOpen: true,
    }))
    setEditModalData(prev => ({
      ...prev,
      ...employee,
    }))
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setIsOpenedDeleteModal(false)
  }, [])

  const handleDeleteUser = useCallback(() => {
    if (!deleteModalData?.employeeId) return
    deleteUser(deleteModalData?.employeeId)
    setIsOpenedDeleteModal(false)
  }, [deleteModalData?.employeeId, deleteUser])

  const handleCreateOrUpdateUser = useCallback(
    (data: UserDto) => {
      isOpenedCreateOrEditModal.isEdit
        ? editUser(
            { ...data, id: data.id },
            {
              onSuccess: () => {
                handleCloseCreateOrEditModal()
              },
            }
          )
        : createUser(data, {
            onSuccess: () => {
              handleCloseCreateOrEditModal()
            },
          })
    },
    [
      createUser,
      editUser,
      handleCloseCreateOrEditModal,
      isOpenedCreateOrEditModal.isEdit,
    ]
  )

  return (
    <>
      <EmployeePageTitle onClick={handleOpenCreateModal} />
      <EmployeePageBody
        employees={employees || []}
        isLoading={isEmployeeListLoading}
        handleOpenDeleteModal={handleOpenDeleteModal}
        handleOpenEditModal={handleOpenEditModal}
      />
      <EmployeeCreateOrEditModal
        isOpen={isOpenedCreateOrEditModal.isOpen}
        onClose={handleCloseCreateOrEditModal}
        handleFormSubmit={handleCreateOrUpdateUser}
        form={form}
        isEditing={isOpenedCreateOrEditModal.isEdit}
        editUserData={editModalData}
      />
      <EmployeeDeleteModal
        employeeName={deleteModalData?.employeeName}
        isOpen={isOpenedDeleteModal}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleDeleteUser}
        employeeRole={deleteModalData?.employeeRole}
      />
    </>
  )
}
