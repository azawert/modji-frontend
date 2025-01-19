import { useNavigate, useParams } from "react-router-dom"
import FormBuilder from "../components/forms/builder/FormBuilder"
import { useGetClientById } from "@/modules/Clients/api/queries"
import { CircularProgress } from "@mui/material"
import { PetPageTitle } from "../components/common/PetPageTitle/PetPageTitle"
import { CardClientSmall } from "@/modules/Clients/components/ClientsPage/CardClientSmall"
import { NewPetDto } from "@/generated/pets"
import { useRef } from "react"
import {
  useAddErrorNotification,
  useAddSuccessNotification,
} from "@/shared/utils/utils"
import { CAT_CONFIG, DOG_CONFIG, EXOT_CONFIG } from "../components"
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
  const addSuccessNotification = useAddSuccessNotification()
  const addErrorNotification = useAddErrorNotification()

  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const { mutate: createPet } = useCreatePet()

  const formRef = useRef<{ leaveForm: () => void }>(null)
  const currentPetType = petType as keyof typeof petConfig

  const { firstName, lastName, middleName, rating } = clientData || {}

  const fullName = `${firstName} ${lastName || ""} ${middleName || ""}`

  const onCloseForm = () => navigate(`/clients/${id}`)

  const handleNavigate = () => {
    formRef.current?.leaveForm()
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
        addSuccessNotification("Питомец успешно создан")
      },
      onError: () => {
        addErrorNotification("Произошла ошибка при создании питомца")
      },
    })
  }

  return (
    <div className="pb-36">
      <div className="pl-6">
        <PetPageTitle />
      </div>

      <div className="flex flex-row">
        <FormBuilder
          ref={formRef}
          config={petConfig[currentPetType].config}
          onSubmit={handleCreatePet}
          onCloseForm={onCloseForm}
        />

        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="cursor-pointer">
            <CardClientSmall
              fullName={fullName}
              rating={String(rating)}
              petType={petConfig[currentPetType].ru}
              onClick={handleNavigate}
            />
          </div>
        )}
      </div>
    </div>
  )
}
