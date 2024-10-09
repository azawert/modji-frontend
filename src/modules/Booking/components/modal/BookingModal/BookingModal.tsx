import { Box, Dialog, DialogTitle } from "@mui/material"
import { memo, useCallback } from "react"
import useBookingStore from "../../../store/BookingStore"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { DeepPartial, UseFormHandleSubmit } from "react-hook-form"
import { IBookingForm } from "../../../model/types/BookingValidationSchema"
import { addConfirmationNotification } from "@/shared/utils/utils"
import { useNavigate } from "react-router-dom"

type TProps = {
  children: React.ReactNode
  onSubmit: UseFormHandleSubmit<DeepPartial<IBookingForm>>
  isDirty: boolean
  isReadyToSubmit?: boolean
}

export const BookingModal: React.FC<TProps> = memo(props => {
  const { children, onSubmit, isDirty, isReadyToSubmit } = props
  const navigate = useNavigate()
  const confirmationNotification = addConfirmationNotification()

  const isModalOpen = useBookingStore(state => state.isBookingInProgress)
  const closeModal = useBookingStore(state => state.setIsBookingInProgress)
  const setBookingStep = useBookingStore(state => state.setBookingStep)
  const bookingStep = useBookingStore(state => state.bookingStep)
  const bookingData = useBookingStore(state => state.bookingData)
  const setBookingData = useBookingStore(state => state.setBookingData)

  const onClose = useCallback(() => closeModal(false), [closeModal])

  const handleBack = useCallback(() => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1)
    } else {
      onClose()
    }
  }, [bookingStep, onClose, setBookingStep])

  const handleCloseModalWindow = () => {
    if (isDirty) {
      confirmationNotification(onClose)
      return
    } else {
      onClose()
    }
  }

  const handleSubmit = (data: DeepPartial<IBookingForm>) => {
    setBookingData({ ...bookingData, ...data })
    if (bookingStep === 5) {
      navigate("/create-booking")
      onClose()
    } else {
      setBookingStep(bookingStep + 1)
    }
  }

  const btnText = [
    "Далее",
    "Следующий шаг",
    "Следующий шаг",
    "Следующий шаг",
    "Следующий шаг",
  ]

  return (
    <Dialog
      open={isModalOpen}
      maxWidth="lg"
      onClose={handleCloseModalWindow}
      aria-labelledby="modal-booking-title"
      aria-describedby="modal-booking-description"
      sx={{
        "& .MuiDialogTitle-root": {
          padding: "40px 64px 0",
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "656px ",
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="flex-start"
        padding="0"
        fontSize={24}
        fontWeight={800}
      >
        Новое бронирование
      </DialogTitle>
      <form className="pb-10 px-16" onSubmit={onSubmit(handleSubmit)}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={"15px"}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            width="100%"
          >
            {children}
          </Box>
        </Box>
        <Box display={"flex"} marginTop="8px" justifyContent={"space-between"}>
          <Button
            variant={EButtonVariant.Secondary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
            onClick={handleBack}
          >
            {bookingStep === 1 ? "Отмена" : "Назад"}
          </Button>
          <Button
            type="submit"
            variant={EButtonVariant.Primary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
            disabled={isReadyToSubmit}
          >
            {btnText[bookingStep - 1]}
          </Button>
        </Box>
      </form>
    </Dialog>
  )
})
