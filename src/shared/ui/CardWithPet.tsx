import React from "react"
import { Typography, Box, styled } from "@mui/material"
import { CardWrapper } from "@/shared/ui/CardWrapper"

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}))
const InfoTitle = styled(Typography)(() => ({
  color: "#757575",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "16px",
}))

const InfoValue = styled(Typography)(() => ({
  color: "#181A1A",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
}))

interface CardWithPetProps {
  petName: string
  petType: string
  breed: string
  width?: string
  height?: string
}

export const CardWithPet: React.FC<CardWithPetProps> = ({
  petName,
  petType,
  breed,
  width,
  height,
}) => {
  return (
    <CardWrapper width={width} height={height}>
      <StyledBox>
        <InfoTitle>Кличка</InfoTitle>
        <InfoValue>{petName}</InfoValue>
      </StyledBox>
      <StyledBox>
        <InfoTitle>Тип животного</InfoTitle>
        <InfoValue>{petType}</InfoValue>
      </StyledBox>
      <StyledBox>
        <InfoTitle>Порода/вид</InfoTitle>
        <InfoValue>{breed}</InfoValue>
      </StyledBox>
    </CardWrapper>
  )
}
