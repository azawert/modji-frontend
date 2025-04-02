import { useCallback } from "react"
import useBookingStore from "../../store/BookingStore"
import { yupResolver } from "@hookform/resolvers/yup"
import { ShortClientSchema } from "../../model/types/ShortClientValidationSchema"
import { useForm, UseFormReturn } from "react-hook-form"
import {
  formatPhoneNumberToServerRequest,
  addErrorNotification,
  addSuccessNotification,
  addConfirmationNotification,
} from "@/shared/utils/utils"
import { ShortClientModal } from "../../components/CreateBooking/modal/ShortClientModal/ShortClientModal"
import { NewOwnerDto } from "@/generated/owners"
import { useCreateClient } from "@/modules/Clients/api/mutation"

const CreateShortClient = () => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(ShortClientSchema),
  })

  const isModalOpen = useBookingStore(state => state.isCreateShortClient)
  const closeModal = useBookingStore(state => state.setIsCreateShortClient)
  const onClose = useCallback(() => {
    form.reset()
    closeModal(false)
  }, [closeModal, form])
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  const confirmationNotification = addConfirmationNotification()
  const { mutate: createClient } = useCreateClient()

  const handleCloseModalWindow = () => {
    if (form.formState.isDirty) {
      confirmationNotification(onClose)
      return
    } else {
      onClose()
    }
  }

  const handleCreateClient = async ({
    mainPhone,
    optionalPhone,
    ...rest
  }: NewOwnerDto) => {
    try {
      await createClient(
        {
          ...rest,
          mainPhone: formatPhoneNumberToServerRequest(mainPhone),
          ...(optionalPhone && {
            optionalPhone: formatPhoneNumberToServerRequest(optionalPhone),
          }),
        },
        {
          onSuccess: () => {
            successNotification("Клиент успешно создан")
            onClose() // Закрытие модального окна
          },
          onError: e => {
            console.error(e)
            errorNotification("Произошла ошибка. Попробуйте позже")
          },
        }
      )
    } catch (error) {
      console.error("Ошибка при создании клиента:", error)
      errorNotification("Произошла ошибка. Попробуйте позже")
    }
  }

  return (
    <ShortClientModal
      form={form as unknown as UseFormReturn<NewOwnerDto>}
      isModalOpen={isModalOpen}
      onClose={handleCloseModalWindow}
      onSubmit={handleCreateClient}
    />
  )
}

export default CreateShortClient
