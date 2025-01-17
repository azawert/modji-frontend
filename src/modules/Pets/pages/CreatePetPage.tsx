import { useParams } from "react-router-dom"
import FormBuilder from "../components/forms/builder/FormBuilder"
import { DOG_CONFIG } from "../components/forms/configs/dogConfig"
import { useGetClientById } from "@/modules/Clients/api/queries"
import { CAT_CONFIG } from "../components/forms/configs/catConfig"
import { EXOT_CONFIG } from "../components/forms/configs/exotConfig"
import { CircularProgress } from "@mui/material"
import { PetPageTitle } from "../components/common/PageTitle/PetPageTitle"
import { useCreatePet } from "../api/mutations"
import { config } from "process"

// const PetTypes = {
//   dog: "Собака",
//   cat: "Кот",
//   other: "Прочее",
// }
// const petConfig = {
//   dog: DOG_CONFIG,
//   cat: CAT_CONFIG,
//   other: EXOT_CONFIG,
// }

const petConfig = {
  dog: {
    name: "dog",
    config: DOG_CONFIG,
    dtoName: "DOG",
  },
  cat: {
    name: "cat",
    config: CAT_CONFIG,
    dtoName: "CAT",
  },
  other: {
    name: "other",
    config: EXOT_CONFIG,
    dtoName: "EXOTIC",
  },
}

export const CreateDogPage = () => {
  const { id, petType } = useParams()
  const currentPetType = petType as keyof typeof petConfig
  const { data: clientData, isLoading } = useGetClientById(Number(id))
  const { mutate: createPet } = useCreatePet()

  const { firstName, lastName, middleName, rating } = clientData || {}

  const fullName = `${firstName} ${lastName || ""} ${middleName || ""} ${
    rating || "0"
  }`

  const handleCreatePet = (data: any) => {
    const cleanObj = obj =>
      Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== ""))

    const payload = {
      ...cleanObj(data),
      ownerId: Number(id),
      type: petConfig[currentPetType].dtoName,
    }
    console.log(payload)
    createPet(payload)
  }
  return (
    <div className="pb-36">
      <div className="pl-6">
        <PetPageTitle />
      </div>
      <div className="flex flex-row">
        <FormBuilder
          config={petConfig[currentPetType].config}
          onSubmit={handleCreatePet}
        />
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <div className="">
            <p>{fullName}</p>
            <p>{petConfig[currentPetType].name}</p>
          </div>
        )}
      </div>
    </div>
  )
}
