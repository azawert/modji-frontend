import { useNavigate, useParams } from "react-router-dom"
import { ClientPageTitle } from "@/modules/Clients/components/ClientPage/ClientPageTitle.tsx"
import { useGetClientById } from "@/modules/Clients/api/queries.ts"
import { CircularProgress } from "@mui/material"
import { ClientFullCard } from "@/modules/Clients/components/ClientPage/ClientFullCard.tsx"
import { useCallback, useEffect, useMemo, useState } from "react"
import { mapDataFromServerToAnFormView } from "@/modules/Clients/utils.ts"
import { ClientPetsCardWrapper } from "@/modules/Clients/components/ClientPage/ClientPetsCardWrapper.tsx"
import { Gap } from "@/shared/ui/Gap.tsx"
import { CreateNewPetModal } from "@/modules/Clients/components/ClientPage/CreateNewPetModal.tsx"
import { PetDtoType } from "@/generated/pets.ts"
import { getFullName } from "@/modules/Employee/utils.ts"
import { mapPetDtoToAnFormView } from "../const"

export const ClientPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const [isNewPetCreateModalOpen, setIsNewPetCreateModalOpen] = useState(false)
  const [selectedPetType, setSelectedPetType] = useState<
    PetDtoType | undefined
  >()
  const [error, setError] = useState<string | undefined>()

  /** Очистка ошибки при выборе какого-либо типа питомца */
  useEffect(() => {
    if (selectedPetType) {
      setError(undefined)
    }
  }, [selectedPetType])

  const handlePetChange = useCallback(
    (val: string) => setSelectedPetType(val as PetDtoType),
    []
  )

  const clientInfo = useMemo(() => {
    if (clientData) {
      return mapDataFromServerToAnFormView(clientData)
    }
  }, [clientData, isLoading])

  const handleEditClientNavigate = useCallback(
    () => navigate(`/client/edit/${id}`),
    [id, navigate]
  )
  /** Необходимо сбрасывать ошибку, состояние поля, и состояние открытости модалки */
  const handleCloseModalWindow = useCallback(() => {
    setIsNewPetCreateModalOpen(false)
    setError(undefined)
    setSelectedPetType(undefined)
  }, [])

  const handleOpenModalWindow = useCallback(
    () => setIsNewPetCreateModalOpen(true),
    []
  )

  const handleNavigateToANewPetCreationPage = useCallback(() => {
    switch (selectedPetType) {
      case PetDtoType.DOG: {
        navigate("/pets/dog/create")
        break
      }
      case PetDtoType.CAT: {
        navigate("/pets/cat/create")
        break
      }
      case PetDtoType.EXOTIC: {
        navigate("/pets/other/create")
        break
      }
      default: {
        setError("Обязательное поле. Пожалуйста, выберете тип животного.")
        break
      }
    }
  }, [navigate, selectedPetType])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <ClientPageTitle onClick={() => {}} />
      <ClientFullCard
        clientInfo={clientInfo}
        handleEditClientNavigate={handleEditClientNavigate}
      />
      <Gap gap={100} />
      <ClientPetsCardWrapper
        pets={clientData?.petsDto?.map(mapPetDtoToAnFormView) ?? []}
        handleOpenNewPetModal={handleOpenModalWindow}
      />
      <CreateNewPetModal
        isOpen={isNewPetCreateModalOpen}
        onClose={handleCloseModalWindow}
        onPetChange={handlePetChange}
        clientName={getFullName(
          clientInfo?.firstName || "",
          clientInfo?.lastName,
          clientInfo?.middleName
        )}
        rating={Number(clientInfo?.rating) || 0}
        onSuccess={handleNavigateToANewPetCreationPage}
        error={error}
        value={selectedPetType}
      />
    </>
  )
}
