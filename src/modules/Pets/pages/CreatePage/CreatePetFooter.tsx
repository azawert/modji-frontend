import { useNavigate, useParams } from "react-router-dom"

import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { addConfirmationNotification } from "@/shared/utils/utils"

import { APP_ROUTES } from "@/routes/types"

import { usePetFormStore } from "../../store"

export const CreatePetFooter = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const confirmNotification = addConfirmationNotification()
  const isDirty = usePetFormStore(state => state.isDirty)
  const onCloseForm = () => navigate(APP_ROUTES.client(Number(id)))

  const handleNavigate = () => {
    if (isDirty) {
      confirmNotification(onCloseForm)
    } else {
      onCloseForm()
    }
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
        Отмена
      </Button>
      <Button
        form="create-pet"
        type="submit"
        variant={EButtonVariant.Primary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
      >
        Создать
      </Button>
    </>
  )
}
