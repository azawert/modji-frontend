import { useNavigate, useParams } from "react-router-dom"
import FormBuilder from "../components/forms/builder/PetFormBuilder"
import { useGetClientById } from "@/modules/Clients/api/queries"
import { CircularProgress } from "@mui/material"
import { CardClientSmall } from "@/modules/Clients/components/ClientsPage/CardClientSmall"
import { useRef } from "react"
import { addConfirmationNotification } from "@/shared/utils/utils"
import { usePetFormStore } from "../store"
import {
  CAT_CONFIG,
  DOG_CONFIG,
  EXOT_CONFIG,
  FormData as PetFormData,
} from "../components"
import { PetPageTitle } from "../components/common"
import { useGetPetById } from "../api/queries"
import { PetTranslatedTypes } from "../components/forms/types/enums"

const petConfig = {
  DOG: DOG_CONFIG,
  CAT: CAT_CONFIG,
  EXOTIC: EXOT_CONFIG,
}

export const PetPage = () => {
  const { id, petId } = useParams()
  const navigate = useNavigate()
  const confirmationNotification = addConfirmationNotification()

  const isDirty = usePetFormStore(state => state.isDirty)

  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const { data: petData, isLoading: isLoadingPet } = useGetPetById(
    Number(petId)
  )

  const formRef = useRef<{ leaveForm: () => void }>(null)

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

  if (isLoading || isLoadingPet) return <CircularProgress />

  return (
    <div className="pb-36">
      <div className="pl-6">
        <PetPageTitle title={"Карточка питомца"} />
      </div>

      <div className="flex flex-row">
        <FormBuilder
          ref={formRef}
          config={petConfig[petData?.type as keyof typeof petConfig]}
          onSubmit={() => {}}
          defaultValues={petData as PetFormData}
          viewMode
        />

        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="cursor-pointer">
            <CardClientSmall
              fullName={fullName}
              rating={String(rating || 0)}
              petType={
                PetTranslatedTypes[
                  petData?.type as keyof typeof PetTranslatedTypes
                ]
              }
              onClick={handleNavigate}
            />
          </div>
        )}
      </div>
    </div>
  )
}
