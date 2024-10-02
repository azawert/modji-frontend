import { PropsWithChildren } from "react"
import { Box, Typography } from "@mui/material"

export const LabeledRow = ({
  label,
  children,
}: { label: string } & PropsWithChildren) => {
  return (
    <Box component="div" display="flex" flexDirection="column">
      <Typography color="#757575" fontSize={12}>
        {label}
      </Typography>
      <Typography>{children}</Typography>
    </Box>
  )
}
