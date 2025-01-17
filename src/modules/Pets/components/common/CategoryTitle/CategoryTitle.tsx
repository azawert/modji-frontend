import { Typography } from "@mui/material"

type Props = {
  title: string
}

export const CategoryTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography fontSize={20} fontWeight={700} padding={"0 0 16px 0"}>
      {title}
    </Typography>
  )
}
