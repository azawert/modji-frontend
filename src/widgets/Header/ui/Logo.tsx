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
    <div className={cn(className, "flex items-center gap-2")}>
      <img src={src} className="mr-2" />
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, color: "black", marginRight: "8px" }}
      >
        {logoTitle}
      </Typography>
    </div>
  )
}
