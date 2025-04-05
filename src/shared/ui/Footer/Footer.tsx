import { styled } from "@mui/material"
import { useLocation } from "react-router-dom"

import { FooterMap } from "@/routes/types"
import { getRouteKeyByPath } from "@/routes/utils"

const StyledFooter = styled("footer")(({ theme }) => ({
  marginTop: "40px",
  boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.09)",
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "flex-end",
  padding: "24px",
  gap: "8px",
  position: "fixed",
  bottom: 0,
  width: "100%",
}))

export const Footer = () => {
  const { pathname } = useLocation()

  const pathnameKey = getRouteKeyByPath(pathname)

  if (!pathnameKey) return null

  const FooterComponent = FooterMap.get(pathnameKey)

  if (!FooterComponent) return null

  return (
    <StyledFooter>
      <FooterComponent />
    </StyledFooter>
  )
}
