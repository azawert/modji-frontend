import { useNavigate, useParams } from "react-router-dom"

import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"

import { APP_ROUTES } from "@/routes/types"

export const ViewPetFooter = () => {
  const { id, petId } = useParams()
  const navigate = useNavigate()

  const handleUpdatePet = () => {
    navigate(APP_ROUTES.updatePet(Number(id), Number(petId)))
  }

  const handleClosePetPage = () => {
    navigate(APP_ROUTES.client(Number(id)))
  }

  return (
    <>
      <Button
        variant={EButtonVariant.Secondary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
        onClick={handleUpdatePet}
      >
        Редактировать
      </Button>
      <Button
        form="update-pet"
        variant={EButtonVariant.Primary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
        onClick={handleClosePetPage}
      >
        Закрыть
      </Button>
    </>
  )
}
