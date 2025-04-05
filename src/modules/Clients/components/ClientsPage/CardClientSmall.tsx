import { Box } from "@mui/material"

import { InfoCard } from "@/shared/ui/InfoCard.tsx"

import { StarIcon } from "@/assets/Icons/StarIcon"

interface CardWithPetProps {
  fullName: string
  rating: string
  petType: string
  onClick: () => void
}

export const CardClientSmall: React.FC<CardWithPetProps> = ({
  fullName,
  rating,
  petType,
  onClick,
}) => {
  return (
    <InfoCard bgColor="#F6F8FF" onClick={onClick} height="168px">
      <Box>
        <InfoCard.Title>ФИО клиента</InfoCard.Title>
        <InfoCard.Value>
          <div className="flex items-center">
            {fullName} &nbsp;
            <StarIcon /> {rating}
          </div>
        </InfoCard.Value>
      </Box>
      <Box>
        <InfoCard.Title>Тип животного</InfoCard.Title>
        <InfoCard.Value>{petType}</InfoCard.Value>
      </Box>
    </InfoCard>
  )
}
