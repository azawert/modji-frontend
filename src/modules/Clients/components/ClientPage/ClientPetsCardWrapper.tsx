import { useCallback } from "react"
import { SectionHeader } from "@/modules/Clients/components/ClientPage/ClientFullCard.tsx"
import { Box, Typography } from "@mui/material"
import { CardWithPet } from "@/modules/Clients/components/ClientsPage/CardWithPet.tsx"
import {
  Button,
  EButtonSize,
  EButtonVariant,
} from "@/shared/ui/Button/Button.tsx"
import { Pet } from "../../types"
import { useNavigate, useParams } from "react-router-dom"
import { APP_ROUTES } from "@/routes/types"

export const ClientPetsCardWrapper = ({
  pets,
  handleOpenNewPetModal,
}: {
  pets: Pet[]
  handleOpenNewPetModal: () => void
}) => {
  const navigate = useNavigate()
  const { id: clientId } = useParams()

  const handleNavigatePetPage = (id: string | number) =>
    navigate(APP_ROUTES.pet(Number(clientId), id))

  const renderHeader = useCallback(
    () => <SectionHeader component="div">Питомцы</SectionHeader>,
    []
  )

  const isZeroState = pets?.length === 0

  const renderZeroState = () => (
    <Box display="flex" justifyContent="center">
      <Typography color="#757575">Пока нет добавленных питомцев</Typography>
    </Box>
  )
  const renderCards = () =>
    pets.map(el => (
      <CardWithPet
        key={el.id}
        petName={el.petName}
        petType={el.petType}
        breed={el.breed}
        onClick={() => handleNavigatePetPage(el.id)}
      />
    ))

  return (
    <>
      <Box>{renderHeader()}</Box>
      <div className="flex justify-between py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-screen-2xl">
          {isZeroState ? renderZeroState() : renderCards()}
        </div>
        <div>
          <Button
            variant={EButtonVariant.Secondary}
            size={EButtonSize.Small}
            onClick={handleOpenNewPetModal}
          >
            Добавить питомца
          </Button>
        </div>
      </div>
    </>
  )
}
