import { Box, Dialog, DialogTitle } from "@mui/material"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { FormField } from "@/modules/Pets/components"
import {
  ControlledDate,
  ControlledSelect,
  ControlledText,
} from "@/modules/Pets/components/forms/fields"
import { renderFields } from "@/modules/Pets/components/forms/utils/groupFormFields"
import { ShortPetFieldsConfig } from "./ShortPetConfig"
import {
  addConfirmationNotification,
  addErrorNotification,
  addSuccessNotification,
} from "@/shared/utils/utils"
import { useCreatePet } from "@/modules/Pets/api"
import { NewPetDto } from "@/generated/pets"
import useBookingStore from "@/modules/Booking/store/BookingStore"
import { Control, FieldErrors, useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ShortPetSchema } from "./types"

interface PetFormData {
  type: string
  name: string
  breed: string
  birthDate: string
  sex: string
}

export const CreateShortPet = () => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<PetFormData>({
    resolver: yupResolver(ShortPetSchema),
  })

  const formValues = useWatch({ control })

  const isShortPetOpen = useBookingStore(state => state.isCreateShortPet)
  const setOwner = useBookingStore(state => state.setOwner)
  const setIsShortPetModal = useBookingStore(state => state.setIsCreateShortPet)
  const owner = useBookingStore(state => state.owner)

  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  const confirmationNotification = addConfirmationNotification()
  const { mutate: createPet, isPending } = useCreatePet(owner?.id || 0)

  const handleCreateShortPet = async (data: NewPetDto) => {
    const petDto = { ...data, ownerId: owner?.id || 0 }
    try {
      await createPet(petDto, {
        onSuccess: res => {
          successNotification("Питомец успешно создан")
          setIsShortPetModal(false)
          setOwner({
            ...owner,
            petsDto: [...(owner?.petsDto || []), res],
          })
        },
        onError: e => {
          console.error(e)
          errorNotification("Произошла ошибка. Попробуйте позже")
        },
      })
    } catch (error) {
      console.error("Ошибка при создании питомца:", error)
      errorNotification("Произошла ошибка. Попробуйте позже")
    }
  }

  const handleCloseModalWindow = () => {
    if (isDirty) {
      confirmationNotification(() => setIsShortPetModal(false))
      return
    } else {
      setIsShortPetModal(false)
    }
  }
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <ControlledText
            key={field.name}
            control={control as unknown as Control}
            errors={errors}
            field={field}
            formValues={formValues}
          />
        )
      case "date":
        return (
          <ControlledDate
            key={field.id}
            field={field}
            control={control as unknown as Control}
            errors={errors as FieldErrors}
          />
        )
      case "select":
        return (
          <ControlledSelect
            key={field.name}
            control={control as unknown as Control}
            field={field}
            errors={errors as FieldErrors}
          />
        )
      default:
        return <div>Нет такого типа поля!</div>
    }
  }

  return (
    <Dialog
      open={isShortPetOpen}
      maxWidth="lg"
      onClose={handleCloseModalWindow}
      aria-labelledby="modal-booking-title"
      aria-describedby="modal-booking-description"
      style={{ overflow: "visible !important" }}
      sx={{
        "& .MuiDialogTitle-root": {
          padding: "40px 64px 0",
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "656px",
          overflow: "visible !important",
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
          {renderFields(ShortPetFieldsConfig, renderField)}
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            onClick={handleSubmit(handleCreateShortPet as () => Promise<void>)}
            variant={EButtonVariant.Primary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
          >
            {isPending ? "Создание..." : "Добавить"}
          </Button>
        </Box>
      </form>
    </Dialog>
  )
}
