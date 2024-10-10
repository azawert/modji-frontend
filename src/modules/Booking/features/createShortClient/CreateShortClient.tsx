import { useCallback } from "react"
import useBookingStore from "../../store/BookingStore"
import { yupResolver } from "@hookform/resolvers/yup"
import { ShortClientSchema } from "../../model/types/ShortClientValidationSchema"
import { useForm } from "react-hook-form"
import {
  formatPhoneNumberToServerRequest,
  addErrorNotification,
  addSuccessNotification,
} from "@/shared/utils/utils"
import { ShortClientModal } from "../../components/modal/ShortClientModal/ShortClientModal"
import { NewOwnerDto } from "@/generated/owners"
import { useCreateClient } from "@/modules/Clients/api/mutation"

const CreateShortClient = () => {
  const form = useForm({
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

  const isModalOpen = useBookingStore(state => state.isCreateShortClient)
  const closeModal = useBookingStore(state => state.setIsCreateShortClient)
  const onClose = useCallback(() => closeModal(false), [closeModal])
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  const { mutate: createClient } = useCreateClient()

  const handleCloseModalWindow = () => {
    if (form.formState.isDirty) {
      errorNotification("Вы точно хотите отменить создание бронирования?")
      return
    } else {
      onClose()
    }
  }

  const handleCreateClient = ({
    mainPhone,
    optionalPhone,
    ...rest
  }: NewOwnerDto) => {
    createClient(
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
          onClose()
          form.reset()
        },
        onError: e => {
          console.error(e)
          errorNotification("Произошла ошибка. Попробуйте позже")
          onClose()
        },
      }
    )
  }

  return (
    <ShortClientModal
      form={form}
      isModalOpen={isModalOpen}
      onClose={handleCloseModalWindow}
      onSubmit={handleCreateClient}
    />
  )
}

export default CreateShortClient
