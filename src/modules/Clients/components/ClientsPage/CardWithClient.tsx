import React, { memo, useCallback, useMemo } from "react"
import { InfoCard } from "@/shared/ui/InfoCard.tsx"
import { Box } from "@mui/material"

interface CardWithClientProps {
  fullName: string
  mainPhone?: string
  optionalPhone?: string
  registrationDate?: string
  handleCardClick?: () => void
  id: string
}

export const CardWithClient: React.FC<CardWithClientProps> = memo(
  ({
    fullName,
    mainPhone,
    optionalPhone,
    registrationDate,
    handleCardClick,
  }) => {
    const infoItems = useMemo(() => {
      return [
        { title: "ФИО", value: fullName },
        { title: "Основной телефон", value: mainPhone },
        { title: "Второй телефон", value: optionalPhone },
        { title: "Дата регистрации", value: registrationDate },
      ]
    }, [fullName, mainPhone, optionalPhone, registrationDate])

    const handleClick = useCallback(() => {
      if (handleCardClick) {
        handleCardClick()
      }
    }, [handleCardClick])

    return (
      <InfoCard bgColor="#F6F8FF" onClick={handleClick}>
        {infoItems.map(el => (
          <Box key={el.title}>
            <InfoCard.Title>{el.title}</InfoCard.Title>
            <InfoCard.Value>{el.value}</InfoCard.Value>
          </Box>
        ))}
      </InfoCard>
    )
  }
)
