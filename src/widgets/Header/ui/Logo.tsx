import img from "@/assets/images/logo.png"
import { cn } from "@/lib/utils"

type TProps = {
  className?: string
}

export const Logo: React.FC<TProps> = props => {
  const { className } = props

  return (
    <div className={cn(className, "flex items-center gap-1 mr-14 w-40 h-10")}>
      <img src={img} />
    </div>
  )
}
