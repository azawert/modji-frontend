import { Card, CardContent, styled } from "@mui/material"

const StyledCard = styled(Card)(() => ({
  width: "296px",
  height: "276px",
  borderRadius: "16px",
  backgroundColor: "#F6F8FF",
  padding: "28px 20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}))

interface CardWrapperProps {
  children: React.ReactNode
  bgColor?: string
  width?: string
  height?: string
  padding?: string
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  bgColor,
  width,
  height,
  padding,
}) => {
  return (
    <StyledCard
      style={{ backgroundColor: bgColor || "#FFFFFF", width, height, padding }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: 0,
        }}
      >
        {children}
      </CardContent>
    </StyledCard>
  )
}
