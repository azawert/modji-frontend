import { Box } from "@mui/material"
import { TextField } from "@/shared/ui/TextField"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { NewOwnerDto } from "@/generated/owners"
import { UseFormReturn, Controller } from "react-hook-form"
import { ShortClientFieldsConfig } from "./ShortClientConfig"
import { Modal } from "@/shared/ui/modal/Modal"
import { PhoneInput } from "@/shared/ui/PhoneInput"

interface ShortClientModalProps {
  form: UseFormReturn<NewOwnerDto>
  isModalOpen: boolean
  onClose: () => void
  onSubmit: (data: NewOwnerDto) => void
}

const PhoneIds = ["mainPhone", "optionalPhone"]

export const ShortClientModal: React.FC<ShortClientModalProps> = ({
  form,
  isModalOpen,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const renderHeader = () => {
    return (
      <Box className="ml-10 pt-8 font-bold" sx={{ fontSize: "24px" }}>
        Новый клиент
      </Box>
    )
  }

  const renderBody = () => {
    return (
      <form className="pb-10" id="create-short-client">
        <Box display="flex" flexDirection="column" gap={2}>
          {ShortClientFieldsConfig.map(field => {
            if (PhoneIds.includes(field.id)) {
              return (
                <Controller
                  name={field.id as never}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      {...field}
                      key={field.id}
                      placeholder={field.label}
                      label={field.label}
                      value={value}
                      onChange={onChange}
                      error={
                        errors[field.id as keyof typeof errors]?.message as
                          | string
                          | undefined
                      }
                    />
                  )}
                />
              )
            }

            return (
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
                      errors[field.id as keyof typeof errors]?.message as
                        | string
                        | undefined
                    }
                  />
                )}
              />
            )
          })}
        </Box>
      </form>
    )
  }

  const renderFooter = () => {
    return (
      <Box
        display="flex"
        justifyContent="space-evenly"
        width={"100%"}
        mt={4}
        gap={4}
      >
        <Button
          onClick={onClose}
          variant={EButtonVariant.Secondary}
          size={EButtonSize.Large}
          fontSize={16}
          fontWeight={700}
        >
          Отмена
        </Button>
        <Button
          onClick={e => handleSubmit(onSubmit)(e)}
          form="create-short-client"
          variant={EButtonVariant.Primary}
          size={EButtonSize.Large}
          fontSize={16}
          fontWeight={700}
        >
          {isSubmitting ? "Создание..." : "Добавить"}
        </Button>
      </Box>
    )
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      ariaLabelledby="modal-booking-title"
      ariaDescribedby="modal-booking-description"
      renderFooter={renderFooter}
      renderHeader={renderHeader}
      renderMainContent={renderBody}
    />
  )
}
