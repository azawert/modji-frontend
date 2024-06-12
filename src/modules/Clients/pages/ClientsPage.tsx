import { useCallback, useState } from "react"
import { ClientsTitle } from "@/modules/Clients/components/ClientsTitle"
import { CreateNewClientModal } from "@/modules/Clients/components/CreateNewClientModal"
import { TableWithClients } from "@/modules/Clients/components/TableWithClients";
import { SearchComponent } from "@/shared/ui/SearchComponent";

export const ClientsPage: React.FC = () => {

  const [isCreateModalOpen, setIsCreateModalOpened] = useState(false);

  const handleOpenCreateModal = useCallback(() => {
    setIsCreateModalOpened(true);
  }, [])

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalOpened(false);
  }, [])

  const handleCreateCategory = useCallback(() => {}, [])
  
  return (
    <>
      <ClientsTitle  onClick={handleOpenCreateModal}/>
      <SearchComponent 
        placeholder="Введите ФИО или телефон клиента"
      />
      <TableWithClients 

      />
      <CreateNewClientModal
        handleCreateClient={handleCreateCategory}
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </>
  )
}