import { useNavigate, useParams } from "react-router-dom"
import FormBuilder from "../components/forms/builder/FormBuilder"
import { DOG_CONFIG } from "../components/forms/configs/dogConfig"
import { useGetClientById } from "@/modules/Clients/api/queries"
import { CAT_CONFIG } from "../components/forms/configs/catConfig"
import { EXOT_CONFIG } from "../components/forms/configs/exotConfig"
import { CircularProgress } from "@mui/material"
import { PetPageTitle } from "../components/common/PageTitle/PetPageTitle"
import { useCreatePet } from "../api/mutations"
import { CardClientSmall } from "@/modules/Clients/components/ClientsPage/CardClientSmall"
import { NewPetDto } from "@/generated/pets"
import { useRef } from "react"
import { useNotification } from "@/contexts/notificationContext/useNotificationContext"
import { generateUniqueId } from "@/shared/utils/utils"
import { ENotificationType } from "@/contexts/notificationContext/NotificationContext"

const petConfig = {
  dog: {
    name: "dog",
    config: DOG_CONFIG,
    dtoName: "DOG",
    ru: "Cобака",
  },
  cat: {
    name: "cat",
    config: CAT_CONFIG,
    dtoName: "CAT",
    ru: "Кошка",
  },
  other: {
    name: "other",
    config: EXOT_CONFIG,
    dtoName: "EXOTIC",
    ru: "Прочее",
  },
}

export const CreatePetPage = () => {
  const { id, petType } = useParams()
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const currentPetType = petType as keyof typeof petConfig
  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const { mutate: createPet } = useCreatePet()
  const formRef = useRef<{ isDirty: boolean }>(null)

  const { firstName, lastName, middleName, rating } = clientData || {}

  const fullName = `${firstName} ${lastName || ""} ${middleName || ""}`

  const onCloseForm = () => navigate(`/clients/${id}`)

  const handleNavigate = () => {
    if (formRef.current?.isDirty) {
      addNotification({
        id: generateUniqueId(),
        isOpened: true,
        text: "Вы точно хотите отменить создание питомца?",
        type: ENotificationType.CONFIRMATION,
        withConfirmationButtons: true,
        handleCloseForm: onCloseForm,
        notificationWidth: "342",
      })
      return
    } else {
      onCloseForm
    }
  }

  const handleCreatePet = (data: NewPetDto) => {
    const cleanObj = (obj: {}) =>
      Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ""))

    const payload = {
      ...cleanObj(data),
      ownerId: Number(id), // ошибка owner на беке
      type: petConfig[currentPetType].dtoName, // ошибка typeOfPet на беке
    }

    createPet(payload as NewPetDto)
  }

  return (
    <div className="pb-36">
      <div className="pl-6">
        <PetPageTitle />
      </div>
      <div className="flex flex-row">
        <FormBuilder
          formRef={formRef}
          config={petConfig[currentPetType].config}
          onSubmit={handleCreatePet}
        />

        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="cursor-pointer">
            <CardClientSmall
              fullName={fullName}
              rating={rating?.toString() || "0"}
              petType={petConfig[currentPetType].ru}
              onClick={handleNavigate}
            />
          </div>
        )}
      </div>
    </div>
  )
}
