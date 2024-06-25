import { useState } from "react"
import { ClientsTitle } from "@/modules/Clients/components/ClientsTitle"
import { CreateNewClientModal } from "@/modules/Clients/components/CreateNewClientModal"
import { TableWithClients } from "@/modules/Clients/components/TableWithClients";
import { SearchComponent } from "@/shared/ui/SearchComponent";
import { useGetAllClients } from "../api/queries";

export const ClientsPage: React.FC = () => {

  const [isCreateModalOpen, setIsCreateModalOpened] = useState(false);
  const {data, isLoading, isError, error} = useGetAllClients();

  const handleOpenCreateModal = () => {
    setIsCreateModalOpened(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpened(false);
  };

  const handleCreateCategory = () => {};
  
  return (
    <>
      <ClientsTitle  onClick={handleOpenCreateModal}/>
      <SearchComponent placeholder="Введите ФИО или телефон клиента"/>
      <TableWithClients 
        data={data?.data ?? []} 
        isLoading={isLoading} 
        isError={isError}
        error={error}
      />
      <CreateNewClientModal
        handleCreateClient={handleCreateCategory}
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </>
  )
}