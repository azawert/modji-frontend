import { Box, Dialog, DialogTitle } from "@mui/material"
import { memo, useCallback } from "react"
import useBookingStore from "../../../store/BookingStore"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ShortClientSchema } from "@/modules/Booking/model/types/ShortClientValidationSchema"
import { ShortClientForm } from "@/modules/Booking/consts/Placeholders"
import { TextField } from "@/shared/ui/TextField"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { useCreateClient } from "@/modules/Clients/api/mutation"
import { NewOwnerDto } from "@/generated/owners"

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

  const { mutate: createClient } = useCreateClient()

  const isModalOpen = useBookingStore(state => state.isCreateShortClient)
  const setBookingStep = useBookingStore(state => state.setBookingStep)
  const closeModal = useBookingStore(state => state.setIsCreateShortClient)
  const onClose = useCallback(() => closeModal(false), [closeModal])

  const onSubmit = async (data: NewOwnerDto) => {
    await createClient(data)
    setBookingStep(4)
    closeModal(false)
  }

  const formFields = [
    {
      id: "lastname",
      label: ShortClientForm.LAST_NAME.valueOf(),
      placeholder: ShortClientForm.LAST_NAME.valueOf(),
      error: errors?.lastname?.message,
    },
    {
      id: "firstName",
      label: ShortClientForm.FIRST_NAME.valueOf(),
      placeholder: ShortClientForm.FIRST_NAME.valueOf(),
      error: errors?.firstName?.message,
    },
    {
      id: "middleName",
      label: ShortClientForm.MIDDLE_NAME.valueOf(),
      placeholder: ShortClientForm.MIDDLE_NAME.valueOf(),
      error: errors?.middleName?.message,
    },
    {
      id: "mainPhone",
      label: ShortClientForm.MAIN_PHONE.valueOf(),
      placeholder: ShortClientForm.MAIN_PHONE.valueOf(),
      error: errors?.mainPhone?.message,
    },
    {
      id: "optionalPhone",
      label: ShortClientForm.OPTIONAL_PHONE.valueOf(),
      placeholder: ShortClientForm.OPTIONAL_PHONE.valueOf(),
      error: errors?.optionalPhone?.message,
    },
    {
      id: "rating",
      label: ShortClientForm.RATING.valueOf(),
      placeholder: ShortClientForm.RATING.valueOf(),
      error: errors?.rating?.message,
    },
  ]

  const isReadyToSubmit = isDirty && Object.keys(errors).length === 0

  return (
    <Dialog
      open={isModalOpen}
      maxWidth="lg"
      onClose={onClose}
      aria-labelledby="modal-booking-title"
      aria-describedby="modal-booking-description"
      sx={{
        "& .MuiDialogTitle-root": {
          padding: "40px 64px 0",
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "656px",
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
      <form className="pb-10 px-16" onSubmit={handleSubmit(onSubmit as never)}>
        <Box display="flex" flexDirection="column" gap={2}>
          {formFields.map(field => (
            <TextField
              key={field.id}
              label={field.label}
              id={field.id}
              placeholder={field.placeholder}
              error={field.error}
              {...register(field.id as never)}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            type="submit"
            variant={EButtonVariant.Primary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
            disabled={!isReadyToSubmit}
          >
            Добавить
          </Button>
        </Box>
      </form>
    </Dialog>
  )
})
