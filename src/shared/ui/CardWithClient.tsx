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

interface CardWithClientProps {
  fullName: string
  mainPhone?: string
  optionalPhone?: string
  registrationDate?: string
  width?: string
  tableView?: boolean
}

export const CardWithClient: React.FC<CardWithClientProps> = ({
  fullName,
  mainPhone,
  optionalPhone,
  registrationDate,
  width,
  tableView,
}) => {
  const renderDefaultView = () => {
    return (
      <CardWrapper bgColor="#F6F8FF" width={width}>
        <StyledBox>
          <InfoTitle>ФИО</InfoTitle>
          <InfoValue>{fullName}</InfoValue>
        </StyledBox>
        <StyledBox>
          <InfoTitle>Основной телефон</InfoTitle>
          <InfoValue>{mainPhone}</InfoValue>
        </StyledBox>
        <StyledBox>
          <InfoTitle>Второй телефон</InfoTitle>
          <InfoValue>{optionalPhone}</InfoValue>
        </StyledBox>
        <StyledBox>
          <InfoTitle>Дата регистрации</InfoTitle>
          <InfoValue>{registrationDate}</InfoValue>
        </StyledBox>
      </CardWrapper>
    )
  }

  const renderTableView = () => {
    return (
      <CardWrapper
        bgColor="#F6F8FF"
        width={width}
        height="136px"
        padding="20px"
      >
        <div className="flex justify-between">
          <StyledBox>
            <InfoTitle>ФИО</InfoTitle>
            <InfoValue>{fullName}</InfoValue>
          </StyledBox>
          <StyledBox>
            <InfoTitle>Дата регистрации</InfoTitle>
            <InfoValue>{registrationDate}</InfoValue>
          </StyledBox>
        </div>
        <div className="flex justify-between">
          <StyledBox>
            <InfoTitle>Основной телефон</InfoTitle>
            <InfoValue>{mainPhone}</InfoValue>
          </StyledBox>
          <StyledBox>
            <InfoTitle>Второй телефон</InfoTitle>
            <InfoValue>{optionalPhone}</InfoValue>
          </StyledBox>
        </div>
      </CardWrapper>
    )
  }
  return tableView ? renderTableView() : renderDefaultView()
}
