import React from "react"
import { IInfoItem } from "@/modules/Clients/types.ts"
import { InfoCard } from "@/shared/ui/InfoCard.tsx"
import { Box } from "@mui/material"
interface CardWithPetProps {
  petName: string
  petType: string
  breed: string
  isAvailableEdit?: boolean
}

export const CardWithPet: React.FC<CardWithPetProps> = ({
  petName,
  petType,
  breed,
}) => {
  const infoItems: IInfoItem[] = [
    { title: "Кличка", value: petName },
    { title: "Тип животного", value: petType },
    { title: "Порода/вид", value: breed },
  ]

  return (
    <InfoCard>
      {infoItems.map(el => (
        <Box key={el.title}>
          <InfoCard.Title>{el.title}</InfoCard.Title>
          <InfoCard.Value>{el.value}</InfoCard.Value>
        </Box>
      ))}
    </InfoCard>
  )
}
