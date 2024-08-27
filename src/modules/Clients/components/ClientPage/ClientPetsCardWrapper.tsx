import { PetDtoType } from "@/generated/pets.ts"
import { useCallback } from "react"
import { SectionHeader } from "@/modules/Clients/components/ClientPage/ClientFullCard.tsx"
import { Box, Typography } from "@mui/material"
import { CardWithPet } from "@/modules/Clients/components/ClientsPage/CardWithPet.tsx"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button.tsx"

/** Интерфейс для животного связанного с клиентом (todo переделать после того как бэк выкатит доработку) */
interface IPet {
  type: PetDtoType
  nickname: string
  breed: string
}

const zeroStateContainerStyles = {
  display: "flex",
  justifyContent: "center",
  flex: "1",
}

export const ClientPetsCardWrapper = ({
  pets,
  handleOpenNewPetModal,
}: {
  pets: IPet[]
  handleOpenNewPetModal: () => void
}) => {
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
        key={el.nickname}
        petName={el.nickname}
        petType={el.type}
        breed={el.breed}
      />
    ))

  return (
    <>
      <Box>{renderHeader()}</Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 32px",
        }}
      >
        <div style={isZeroState ? { ...zeroStateContainerStyles } : {}}>
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
