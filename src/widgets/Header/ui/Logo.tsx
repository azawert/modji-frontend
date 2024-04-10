import { cn } from "@/lib/utils"
import { Typography } from "@mui/material"

type TProps = {
  src: string
  logoTitle: string
  className?: string
}

export const Logo: React.FC<TProps> = props => {
  const { logoTitle, src, className } = props

  return (
    <div className={cn(className, "flex items-center gap-1 mr-14")}>
      <img src={src} />
      <Typography sx={{ color: "#181A1A" }} fontSize="16px" fontWeight="700">
        {logoTitle}
      </Typography>
    </div>
  )
}
