import { Typography } from "@mui/material"

export const StepTitle = ({ title }: { title: string }) => {
  return (
    <Typography fontSize={20} fontWeight={700} className="font-body">
      {title}
    </Typography>
  )
}
