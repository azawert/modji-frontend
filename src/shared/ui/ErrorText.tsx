import { Typography } from "@mui/material"
import { cn } from "@/lib/utils.ts"

export enum EErrorColor {
  RED = "RED",
  ORANGE = "ORANGE",
}

export const ErrorText = ({
  children,
  color,
}: {
  children: React.ReactNode
  color: EErrorColor
}) => (
  <Typography
    className={cn({
      "text-[#FF7878]": color === EErrorColor.RED,
    })}
    fontSize={12}
  >
    {children}
  </Typography>
)
