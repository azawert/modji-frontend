import { useState } from "react"
import { ClientsTitle } from "@/modules/Clients/components/ClientsPage/ClientsTitle.tsx"
import { CreateNewClientModal } from "@/modules/Clients/components/ClientsPage/CreateNewClientModal.tsx"
import { TableWithClients } from "@/modules/Clients/components/ClientsPage/TableWithClients.tsx"
import { SearchComponent } from "@/shared/ui/SearchComponent"
import { useGetAllClients } from "../api/queries"
import { useCreateClient } from "../api/mutation"
import { NewOwnerDto } from "@/generated/owners"
import {
  formatPhoneNumberToServerRequest,
  useAddErrorNotification,
  useAddSuccessNotification,
} from "@/shared/utils/utils"

export const ClientsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpened] = useState(false)
  const addSuccessNotification = useAddSuccessNotification()
  const addErrorNotification = useAddErrorNotification()
  const { data, isLoading, isError, error } = useGetAllClients()
  const { mutate: createClient } = useCreateClient()

  const handleOpenCreateModal = () => {
    setIsCreateModalOpened(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpened(false)
  }

  const handleCreateClient = ({
    mainPhone,
    optionalPhone,
    ...rest
  }: NewOwnerDto) => {
    createClient(
      {
        ...rest,
        mainPhone: formatPhoneNumberToServerRequest(mainPhone),
        ...(optionalPhone && {
          optionalPhone: formatPhoneNumberToServerRequest(optionalPhone),
        }),
      },
      {
        onSuccess: () => {
          addSuccessNotification("Клиент успешно создан")
          handleCloseCreateModal()
        },
        onError: e => {
          console.error(e)
          addErrorNotification("Произошла ошибка. Попробуйте позже")
          handleCloseCreateModal()
        },
      }
    )
  }

  return (
    <>
      <ClientsTitle onClick={handleOpenCreateModal} />
      <SearchComponent placeholder="Введите ФИО или телефон клиента" />
      <TableWithClients
        data={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <CreateNewClientModal
        handleCreateClient={handleCreateClient}
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </>
  )
}
