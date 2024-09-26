import { Box, Dialog, DialogTitle } from "@mui/material"
import { memo, useCallback } from "react"
import useBookingStore from "../../../store/BookingStore"
import {  useForm } from "react-hook-form"
import { useNotification } from "@/contexts/notificationContext/useNotificationContext"
import { generateUniqueId } from "@/shared/utils/utils"
import { ENotificationType } from "@/contexts/notificationContext/NotificationContext"
import { yupResolver } from "@hookform/resolvers/yup"
import { ShortClientSchema } from "@/modules/Booking/model/types/ShortClientValidationSchema"
import { ShortClientForm } from "@/modules/Booking/consts/Placeholders"
import { TextField } from "@/shared/ui/TextField"



export const ShortClientModal: React.FC = memo(() => {

  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
  } = useForm({
    resolver: yupResolver(ShortClientSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastname: "",
      mainPhone: "",
      rating: 0,
      optionalPhone: "",
    },
  })

  const { addNotification } = useNotification()

  const isModalOpen = useBookingStore(state => state.isCreateShortClient)
  const closeModal = useBookingStore(state => state.setIsCreateShortClient)
  const onClose = useCallback(() => closeModal(false), [closeModal])



  const handleCloseModalWindow = () => {
    if (isDirty) {
      addNotification({
        id: generateUniqueId(),
        isOpened: true,
        text: "Вы точно хотите отменить создание бронирования?",
        type: ENotificationType.CONFIRMATION,
        withConfirmationButtons: true,
        handleCloseForm: onClose,
        notificationWidth: "342",
      })
      return
    } else {
      onClose()
    }
  }

  const onSubmit = () => {
    
  }


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
        Новый клиент
      </DialogTitle>
      <form className="pb-10 px-16" onSubmit={handleSubmit(onSubmit)}>
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
        <TextField
          label={ShortClientForm.LAST_NAME.valueOf()}
          id={ShortClientForm.LAST_NAME.valueOf()}
          placeholder={ShortClientForm.LAST_NAME.valueOf()}
          error={errors?.lastname?.message}
          {...register("lastname")}
        />
        <TextField
          label={ShortClientForm.FIRST_NAME.valueOf()}
          id={ShortClientForm.FIRST_NAME.valueOf()}
          placeholder={ShortClientForm.FIRST_NAME.valueOf()}
          error={errors?.firstName?.message}
          {...register("firstName")}
        />
        <TextField
          label={ShortClientForm.MIDDLE_NAME.valueOf()}
          id={ShortClientForm.MIDDLE_NAME.valueOf()}
          placeholder={ShortClientForm.MIDDLE_NAME.valueOf()}
          error={errors?.middleName?.message}
          {...register("middleName")}
        />
        <TextField
          label={ShortClientForm.MAIN_PHONE.valueOf()}
          id={ShortClientForm.MAIN_PHONE.valueOf()}
          placeholder={ShortClientForm.MAIN_PHONE.valueOf()}
          error={errors?.mainPhone?.message}
          {...register("mainPhone")}
        />
        <TextField
          label={ShortClientForm.OPTIONAL_PHONE.valueOf()}
          id={ShortClientForm.OPTIONAL_PHONE.valueOf()}
          placeholder={ShortClientForm.OPTIONAL_PHONE.valueOf()}
          error={errors?.optionalPhone?.message}
          {...register("optionalPhone")}
        />
        <TextField
          label={ShortClientForm.RATING.valueOf()}
          id={ShortClientForm.RATING.valueOf()}
          placeholder={ShortClientForm.RATING.valueOf()}
          error={errors?.rating?.message}
          {...register("rating")}
        />
          </Box>
        </Box>
      </form>
    </Dialog>
  )
})
