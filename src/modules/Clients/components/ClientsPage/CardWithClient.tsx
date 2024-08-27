import React from "react"
import { InfoCard } from "@/shared/ui/InfoCard.tsx"
import { IInfoItem } from "@/modules/Clients/types.ts"
import { Box } from "@mui/material"

interface CardWithClientProps {
  fullName: string
  mainPhone?: string
  optionalPhone?: string
  registrationDate?: string
  handleCardClick?: () => void
  id: string
}

export const CardWithClient: React.FC<CardWithClientProps> = ({
  fullName,
  mainPhone,
  optionalPhone,
  registrationDate,
  handleCardClick,
}) => {
  const infoItems: IInfoItem[] = [
    { title: "ФИО", value: fullName },
    { title: "Основной телефон", value: mainPhone },
    { title: "Второй телефон", value: optionalPhone },
    { title: "Дата регистрации", value: registrationDate },
  ]

  return (
    <InfoCard bgColor="#F6F8FF" onClick={handleCardClick}>
      {infoItems.map(el => (
        <Box key={el.title}>
          <InfoCard.Title>{el.title}</InfoCard.Title>
          <InfoCard.Value>{el.value}</InfoCard.Value>
        </Box>
      ))}
    </InfoCard>
  )
}
