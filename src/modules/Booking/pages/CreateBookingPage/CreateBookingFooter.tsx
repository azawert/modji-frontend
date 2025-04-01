import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { useNavigate } from "react-router-dom"

export const BookingFooter = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button
        variant={EButtonVariant.Secondary}
        size={EButtonSize.Large}
        fontSize={16}
        fontWeight={700}
        onClick={() => navigate("/")}
      >
        Отмена
      </Button>
      <Button
        form="booking"
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
