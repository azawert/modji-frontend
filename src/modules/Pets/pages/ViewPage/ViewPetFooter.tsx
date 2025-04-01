import { useNavigate, useParams } from "react-router-dom"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { APP_ROUTES } from "@/routes/types"

export const ViewPetFooter = () => {
  const { id, petId } = useParams()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(APP_ROUTES.updatePet(Number(id), Number(petId)))
  }
  return (
    <>
      <Button
        variant={EButtonVariant.Secondary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
        onClick={handleNavigate}
      >
        Редактировать
      </Button>
      <Button
        form="update-pet"
        variant={EButtonVariant.Primary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
        onClick={handleNavigate}
      >
        Закрыть
      </Button>
    </>
  )
}
