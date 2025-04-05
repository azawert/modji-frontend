import { useCallback, useMemo } from "react"

import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { CardWithClient } from "@/modules/Clients/components/ClientsPage/CardWithClient"
import { CardWithPet } from "@/modules/Clients/components/ClientsPage/CardWithPet"

import { OwnerDto } from "@/generated/owners"
import { APP_ROUTES } from "@/routes/types"

import {
  mapResponseToTableView,
  mapperForValuePetTypeToAnLabel,
} from "../utils"

export const useClientTableRows = (data: OwnerDto[]) => {
  const navigate = useNavigate()

  const handleOpenClientPage = useCallback(
    (id: string) => navigate(APP_ROUTES.client(id)),
    [navigate],
  )

  const handleOpenPetPage = useCallback(
    (clientId: string, petId: string) =>
      navigate(APP_ROUTES.pet(clientId, petId)),
    [navigate],
  )

  return useMemo(() => {
    return mapResponseToTableView(data).map(data => ({
      client: (
        <CardWithClient
          fullName={data.client.fullName}
          mainPhone={data.client.mainPhone}
          optionalPhone={data.client.optionalPhone}
          registrationDate={data.client.registrationDate}
          id={data.client.id}
          handleCardClick={() => handleOpenClientPage(data.client.id)}
        />
      ),
      pets: (
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap="12px 16px">
          {data.pets.map(pet => (
            <CardWithPet
              key={pet.id}
              petName={pet.petName}
              petType={mapperForValuePetTypeToAnLabel[pet.petType]}
              breed={pet.breed}
              onClick={() =>
                handleOpenPetPage(String(data.client.id), String(pet.id))
              }
            />
          ))}
        </Box>
      ),
    }))
  }, [data, handleOpenClientPage, handleOpenPetPage])
}
