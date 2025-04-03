import { useNavigate, useParams } from "react-router-dom"
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
import { usePetFormStore } from "../../store"
import { useGetPetById } from "../../api/queries"
import { useUpdatePet } from "../../api"
import { PetPageTitle } from "../../components/common"
import { CAT_CONFIG, DOG_CONFIG, EXOT_CONFIG, FormData } from "../../components"
import FormBuilder from "../../components/forms/builder/PetFormBuilder"
import { APP_ROUTES } from "@/routes/types"

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
  exotic: {
    name: "other",
    config: EXOT_CONFIG,
    dtoName: "EXOTIC",
    ru: "Прочее",
  },
}

export const UpdatePetPage = () => {
  const { id, petId } = useParams()
  const navigate = useNavigate()
  const successNotification = addSuccessNotification()
  const errorNotification = addErrorNotification()
  const confirmationNotification = addConfirmationNotification()

  const isDirty = usePetFormStore(state => state.isDirty)
  const dirtyFields = usePetFormStore(state => state.dirtyFields)

  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const { data: petData, isLoading: isPetLoading } = useGetPetById(
    Number(petId)
  )

  const { mutate: updatePet } = useUpdatePet(petData?.id || 0)

  const formRef = useRef<{ leaveForm: () => void }>(null)

  const { firstName, lastName, middleName, rating } = clientData || {}

  const fullName = `${firstName} ${lastName || ""} ${middleName || ""}`

  const onCloseForm = () => navigate(APP_ROUTES.client(Number(id)))
  const onSubmitForm = () => navigate(APP_ROUTES.pet(Number(id), Number(petId)))

  const handleNavigate = () => {
    if (isDirty) {
      confirmationNotification(onCloseForm)
    } else {
      onCloseForm()
    }
  }

  const handleUpdatePet = async (data: NewPetDto) => {
    const cleanObj = (obj: {}) =>
      Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ""))

    const filtered = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key] === true && key in data) {
        const petKey = key as keyof NewPetDto
        const value = data[petKey]

        if (typeof value === "string") {
          acc[petKey] = value as unknown as undefined
        }
      }
      return acc
    }, {} as Partial<NewPetDto>)

    const payload = {
      ...cleanObj(filtered),
      ownerId: Number(id),
    }

    updatePet(payload as NewPetDto, {
      onSuccess: () => {
        onSubmitForm()
        successNotification("Питомец успешно изменён")
      },
      onError: () => {
        errorNotification("Произошла ошибка при изменении питомца")
      },
    })
  }

  if (!petData) {
    return null
  }

  return (
    <div className="pb-36">
      <div className="pl-6">
        <PetPageTitle title={`Редактирование питомца`} />
      </div>

      <div className="flex flex-row">
        <FormBuilder
          ref={formRef}
          config={
            petConfig[petData.type?.toLowerCase() as keyof typeof petConfig]
              ?.config
          }
          onSubmit={handleUpdatePet as never}
          defaultValues={petData as unknown as FormData}
          formId="update-pet"
        />

        {(isLoading || isPetLoading) && <CircularProgress />}
        {!isLoading && (
          <div className="cursor-pointer">
            <CardClientSmall
              fullName={fullName}
              rating={String(rating || 0)}
              petType={petData.type!}
              onClick={handleNavigate}
            />
          </div>
        )}
      </div>
    </div>
  )
}
