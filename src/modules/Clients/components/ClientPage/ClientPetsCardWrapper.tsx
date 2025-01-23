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
import { useNavigate } from "react-router-dom"

export const ClientPetsCardWrapper = ({
  pets,
  handleOpenNewPetModal,
}: {
  pets: Pet[]
  handleOpenNewPetModal: () => void
}) => {
  const navigate = useNavigate()

  const handleNavigatePetPage = (id: string | number) => navigate(`pets/${id}`)

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
        key={el.breed}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-screen-2xl">
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
