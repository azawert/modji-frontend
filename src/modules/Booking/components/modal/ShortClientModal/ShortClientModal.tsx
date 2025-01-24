import { Box, Dialog, DialogTitle } from "@mui/material"
import { memo } from "react"
import { TextField } from "@/shared/ui/TextField"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { NewOwnerDto } from "@/generated/owners"
import { UseFormReturn, Controller } from "react-hook-form"
import { ShortClientFieldsConfig } from "./ShortClientConfig"

interface ShortClientModalProps {
  form: UseFormReturn<NewOwnerDto>
  isModalOpen: boolean
  onClose: () => void
  onSubmit: (data: NewOwnerDto) => void
}

export const ShortClientModal: React.FC<ShortClientModalProps> = ({
  form,
  isModalOpen,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isSubmitting },
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
      <form className="pb-10 px-16">
        <Box display="flex" flexDirection="column" gap={2}>
          {ShortClientFieldsConfig.map(field => (
            <Controller
              name={field.id as never}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  {...field}
                  key={field.id}
                  placeholder={field.label}
                  label={field.label}
                  value={value}
                  onChange={onChange}
                  className="w-px-1"
                  error={
                    errors[field.id as never]?.message as string | undefined
                  }
                />
              )}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            onClick={e => {
              handleSubmit(onSubmit)(e)
            }}
            variant={EButtonVariant.Primary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
          >
            {isSubmitting ? "Создание..." : "Добавить"}
          </Button>
        </Box>
      </form>
    </Dialog>
  )
}
