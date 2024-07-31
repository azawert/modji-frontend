import { memo } from "react"
import { cn } from "@/lib/utils"

export enum ETextType {
  NORMAL = "normal",
  SMALL = "small",
  LARGE = "large",
}

/**
 * @prop textType тип текста (размер шрифтов)
 * @prop [isActive] флаг активности (необходим для отображения активного состояния)
 * @prop [isBold] флаг жирности текста
 * @prop [onClick] обработчик клика по ссылке
 */
type TProps = {
  textType: ETextType
  isActive?: boolean
  isBold?: boolean
  onClick?: () => void
  className?: string
} & React.PropsWithChildren &
  React.HTMLAttributes<HTMLSpanElement>

const Component: React.FC<TProps> = props => {
  const {
    textType = ETextType.NORMAL,
    isActive,
    isBold,
    children,
    onClick,
    className,
    ...rest
  } = props

  return (
    <span
      onClick={onClick}
      className={cn(`text-black cursor-pointer gap-7 ${className}`, {
        "underline-offset-8 underline text-primaryTextBlue decoration-2":
          isActive,
        "font-light font-base": textType === ETextType.NORMAL,
        "font-bold": isBold,
      })}
      {...rest}
    >
      {children}
    </span>
  )
}

export const Link = memo(Component)
