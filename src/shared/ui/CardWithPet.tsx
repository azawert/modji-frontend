import React from "react"
import { Typography, Box, styled, IconButton } from "@mui/material"
import { CardWrapper } from "@/shared/ui/CardWrapper"
import { Icon } from "./Icon/Icon"

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
  onClick?: () => void
  petName: string
  petType: string
  breed: string
  width?: string
  height?: string
  readOnly?: boolean
}

export const CardWithPet: React.FC<CardWithPetProps> = ({
  petName,
  petType,
  breed,
  width,
  height,
  onClick,
  readOnly = false,
}) => {
  return (
    <CardWrapper onClick={onClick} width={width} height={height}>
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
        {!readOnly && (
          <IconButton className="self-end" onClick={onClick}>
            <Icon type="RoundedPlusIcon" width="30" height="30" />
          </IconButton>
        )}
      </StyledBox>
    </CardWrapper>
  )
}
