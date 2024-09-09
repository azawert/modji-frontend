import React, { memo } from "react"
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

interface InfoCardTitleProps {
  children: React.ReactNode
}

interface InfoCardValueProps {
  children: React.ReactNode
}

const InfoCardComponent: React.FC<InfoCardProps> = memo(
  ({ children, bgColor, onClick }) => {
    return (
      <CardWrapper bgColor={bgColor || "#FFFFFF"} onClick={onClick}>
        {children}
      </CardWrapper>
    )
  }
)

const InfoCardTitleComponent: React.FC<InfoCardTitleProps> = memo(
  ({ children }) => (
    <Box>
      <InfoTitle>{children}</InfoTitle>
    </Box>
  )
)

const InfoCardValueComponent: React.FC<InfoCardValueProps> = memo(
  ({ children }) => (
    <Box>
      <InfoValue>{children}</InfoValue>
    </Box>
  )
)

export const InfoCard = Object.assign(InfoCardComponent, {
  Title: InfoCardTitleComponent,
  Value: InfoCardValueComponent,
})
