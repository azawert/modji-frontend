import { addConfirmationNotification } from "@/shared/utils/utils"
import { useNavigate, useParams } from "react-router-dom"
import { usePetFormStore } from "../../store"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { APP_ROUTES } from "@/routes/types"

export const UpdatePetFooter = () => {
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
        form="update-pet"
        type="submit"
        variant={EButtonVariant.Primary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
      >
        Сохранить
      </Button>
    </>
  )
}
