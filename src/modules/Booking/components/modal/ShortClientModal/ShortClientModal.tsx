import { Box, Dialog, DialogTitle } from "@mui/material"
import { memo } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { ShortClientForm } from "@/modules/Booking/consts/Placeholders"
import { TextField } from "@/shared/ui/TextField"
import { NewOwnerDto } from "@/generated/owners"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"

interface IShortClientProps {
  onClose: () => void
  onSubmit: (data: NewOwnerDto) => void
  isModalOpen: boolean
  form: ReturnType<typeof useForm>
}

export const ShortClientModal: React.FC<IShortClientProps> = memo(props => {
  const { onClose, onSubmit, isModalOpen, form } = props
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form
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
      <form
        className="pb-10 px-16"
        onSubmit={(data: FieldValues) => onSubmit(data as NewOwnerDto)}
      >
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
              error={errors?.lastname?.message as string}
              {...register("lastname")}
            />
            <TextField
              label={ShortClientForm.FIRST_NAME.valueOf()}
              id={ShortClientForm.FIRST_NAME.valueOf()}
              placeholder={ShortClientForm.FIRST_NAME.valueOf()}
              error={errors?.firstName?.message as string}
              {...register("firstName")}
            />
            <TextField
              label={ShortClientForm.MIDDLE_NAME.valueOf()}
              id={ShortClientForm.MIDDLE_NAME.valueOf()}
              placeholder={ShortClientForm.MIDDLE_NAME.valueOf()}
              error={errors?.middleName?.message as string}
              {...register("middleName")}
            />
            <TextField
              label={ShortClientForm.MAIN_PHONE.valueOf()}
              id={ShortClientForm.MAIN_PHONE.valueOf()}
              placeholder={ShortClientForm.MAIN_PHONE.valueOf()}
              error={errors?.mainPhone?.message as string}
              {...register("mainPhone")}
            />
            <TextField
              label={ShortClientForm.OPTIONAL_PHONE.valueOf()}
              id={ShortClientForm.OPTIONAL_PHONE.valueOf()}
              placeholder={ShortClientForm.OPTIONAL_PHONE.valueOf()}
              error={errors?.optionalPhone?.message as string}
              {...register("optionalPhone")}
            />
            <TextField
              className="mb-5"
              label={ShortClientForm.RATING.valueOf()}
              id={ShortClientForm.RATING.valueOf()}
              placeholder={ShortClientForm.RATING.valueOf()}
              error={errors?.rating?.message as string}
              {...register("rating")}
            />
            <Button
              onClick={handleSubmit(onSubmit as unknown as () => void)}
              variant={EButtonVariant.Primary}
              size={EButtonSize.Large}
              fontSize={16}
              fontWeight={700}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  )
})
