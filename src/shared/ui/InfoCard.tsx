import React from "react"
import { Typography, styled, Box } from "@mui/material"
import { CardWrapper } from "@/shared/ui/CardWrapper"

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

interface InfoCardProps {
  children: React.ReactNode
  bgColor?: string
  onClick?: () => void
}

export const InfoCard: React.FC<InfoCardProps> & {
  Title: React.FC<{ children: React.ReactNode }>
  Value: React.FC<{ children: React.ReactNode }>
} = ({ children, bgColor, onClick }) => {
  return (
    <CardWrapper bgColor={bgColor || "#FFFFFF"} onClick={onClick}>
      {children}
    </CardWrapper>
  )
}

const InfoCardTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box>
    <InfoTitle>{children}</InfoTitle>
  </Box>
)

const InfoCardValue: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box>
    <InfoValue>{children}</InfoValue>
  </Box>
)

InfoCard.Title = InfoCardTitle
InfoCard.Value = InfoCardValue
