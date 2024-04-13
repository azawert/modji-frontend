import { TIcon, iconTypes } from "@/assets/Icons/types"
import { cn, formatToStringWithPx } from "@/lib/utils"
import { DOMAttributes, memo, useEffect, useRef } from "react"
import styles from "./Icon.module.scss"

const getIcon = (type: TIcon) => iconTypes.get(type)

/**
 * @prop type Тип иконки
 * @prop [className] класс иконки
 * @prop [color] цвет иконки
 * @prop [height] высота иконки
 * @prop [width] ширина иконки
 * @prop [size] размер иконки
 */
type TProps = {
  type?: TIcon
  className?: string
  color?: string
  height?: string
  width?: string
  size?: string
} & DOMAttributes<HTMLSpanElement>

const Component: React.FC<TProps> = props => {
  const { type, className, height, width, size, ...rest } = props

  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (iconRef.current) {
      if (size && !height && !width) {
        iconRef.current.style.setProperty(
          "--icon-height",
          formatToStringWithPx(size)
        )
        iconRef.current.style.setProperty(
          "--icon-width",
          formatToStringWithPx(size)
        )
      } else if (!size && height && width) {
        iconRef.current.style.setProperty(
          "--icon-height",
          formatToStringWithPx(height)
        )
        iconRef.current.style.setProperty(
          "--icon-width",
          formatToStringWithPx(width)
        )
      }
    }
  }, [height, size, width])
  if (!type) {
    return
  }

  return (
    <div className={cn(styles.Icon, className)} ref={iconRef} {...rest}>
      {getIcon(type)}
    </div>
  )
}

export const Icon = memo(Component)
