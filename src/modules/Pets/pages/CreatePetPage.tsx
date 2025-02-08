import { useNavigate, useParams } from "react-router-dom"
import FormBuilder from "../components/forms/builder/PetFormBuilder"
import { useGetClientById } from "@/modules/Clients/api/queries"
import { CircularProgress } from "@mui/material"
import { CardClientSmall } from "@/modules/Clients/components/ClientsPage/CardClientSmall"
import { NewPetDto } from "@/generated/pets"
import { useRef } from "react"
import {
  addConfirmationNotification,
  addErrorNotification,
  addSuccessNotification,
} from "@/shared/utils/utils"
import { usePetFormStore } from "../store"
import { CAT_CONFIG, DOG_CONFIG, EXOT_CONFIG } from "../components"
import { PetPageTitle } from "../components/common"
import { useCreatePet } from "../api"

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
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  const confirmationNotification = addConfirmationNotification()

  const isDirty = usePetFormStore(state => state.isDirty)

  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const { mutate: createPet } = useCreatePet(clientData?.id || 0)

  const formRef = useRef<{ leaveForm: () => void }>(null)
  const currentPetType = petType as keyof typeof petConfig

  const { firstName, lastName, middleName, rating } = clientData || {}

  const fullName = `${firstName} ${lastName || ""} ${middleName || ""}`

  const onCloseForm = () => navigate(`/clients/${id}`)

  const handleNavigate = () => {
    if (isDirty) {
      confirmationNotification(onCloseForm)
    } else {
      onCloseForm()
    }
  }

  const handleCreatePet = async (data: NewPetDto) => {
    const cleanObj = (obj: {}) =>
      Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ""))

    const payload = {
      ...cleanObj(data),
      ownerId: Number(id), // ошибка owner на беке
      type: petConfig[currentPetType].dtoName, // ошибка typeOfPet на беке
    }

    createPet(payload as NewPetDto, {
      onSuccess: () => {
        onCloseForm()
        successNotification("Питомец успешно создан")
      },
      onError: () => {
        errorNotification("Произошла ошибка при создании питомца")
      },
    })
  }

  return (
    <div className="pb-36">
      <div className="pl-6">
        <PetPageTitle title={`Создание питомца`} />
      </div>

      <div className="flex flex-row">
        <FormBuilder
          ref={formRef}
          config={petConfig[currentPetType].config}
          onSubmit={handleCreatePet as never}
        />

        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="cursor-pointer">
            <CardClientSmall
              fullName={fullName}
              rating={String(rating || 0)}
              petType={petConfig[currentPetType].ru}
              onClick={handleNavigate}
            />
          </div>
        )}
      </div>
    </div>
  )
}
