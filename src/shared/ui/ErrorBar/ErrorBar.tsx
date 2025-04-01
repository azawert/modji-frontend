import { Box } from "@mui/material"
import { Typography, styled } from "@mui/material"
import { Icon } from "../Icon/Icon"
import { BarStyle } from "./utils"

const BarTitle = styled(Typography)(() => ({
  color: "#181A1A",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "16px",
  paddingLeft: "8px",
}))
const BarBody = styled(Typography)(() => ({
  color: "#181A1A",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  paddingLeft: "8px",
}))

interface ErrorProps {
  title: string
  body: string
  style: StyleTheme
}
export type StyleTheme = "Blue" | "Red" | "Yellow"

const ErrorBar = (props: ErrorProps) => {
  const { title, body, style } = props
  const Bar = BarStyle(style)

  return (
    <Box
      className="pt-5 px-4 items-start"
      display={"flex"}
      sx={{ border: Bar.Border, borderRadius: "12px", width: "100%" }}
    >
      <Icon width="24px" height="24px" type={Bar.Logo} />
      <div>
        <BarTitle>{title}</BarTitle>
        <BarBody className="pt-1 pb-4 ">{body}</BarBody>
      </div>
    </Box>
  )
}

export default ErrorBar
