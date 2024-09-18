import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { styled } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

const StyledFooter = styled("footer")(({ theme }) => ({
  marginTop: "40px",
  boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.09)",
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "flex-end",
  padding: "24px",
  gap: "8px",
}))

export const Footer = () => {
  const { pathname } = useLocation()
  const isCreateBookingPage = pathname.includes("create-booking")
  return <StyledFooter>{isCreateBookingPage && <BookingFooter />}</StyledFooter>
}

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
