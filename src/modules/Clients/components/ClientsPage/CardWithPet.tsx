import React from "react"

import { Box } from "@mui/material"

import { InfoCard } from "@/shared/ui/InfoCard.tsx"

import { IInfoItem } from "@/modules/Clients/types.ts"

interface CardWithPetProps {
  petName: string
  petType: string
  breed: string
  isAvailableEdit?: boolean
  onClick?: () => void
}

export const CardWithPet: React.FC<CardWithPetProps> = ({
  petName,
  petType,
  breed,
  onClick,
}) => {
  const infoItems: IInfoItem[] = [
    { title: "Кличка", value: petName },
    { title: "Тип животного", value: petType },
    { title: "Порода/вид", value: breed },
  ]

  return (
    <InfoCard onClick={onClick}>
      {infoItems.map(el => (
        <Box key={el.title}>
          <InfoCard.Title>{el.title}</InfoCard.Title>
          <InfoCard.Value>{el.value}</InfoCard.Value>
        </Box>
      ))}
    </InfoCard>
  )
}
