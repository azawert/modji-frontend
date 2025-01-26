import { usePetFormStore } from "@/modules/Pets/store"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { addConfirmationNotification } from "@/shared/utils/utils"
import { styled } from "@mui/material"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const StyledFooter = styled("footer")(({ theme }) => ({
  marginTop: "40px",
  boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.09)",
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "flex-end",
  padding: "24px",
  gap: "8px",
  position: "fixed",
  bottom: 0,
  width: "100%",
}))

export const Footer = () => {
  const { pathname } = useLocation()
  const isCreateBookingPage = pathname.includes("create-booking")

  const regex = /\/clients\/(\d+)\/pets\/(dog|cat|other)\/create/
  const isCreatePetPage = pathname.match(regex)

  return (
    <StyledFooter>
      {isCreateBookingPage && <BookingFooter />}
      {isCreatePetPage && <CreatePetFooter />}
    </StyledFooter>
  )
}

const BookingFooter = () => {
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

const CreatePetFooter = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const confirmNotification = addConfirmationNotification()
  const isDirty = usePetFormStore(state => state.isDirty)
  const onCloseForm = () => navigate(`/clients/${id}`)

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
