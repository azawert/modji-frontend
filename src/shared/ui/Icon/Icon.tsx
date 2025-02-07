import { TIcon, iconTypes } from "@/assets/Icons/types"
import { cn, formatToStringWithPx } from "@/lib/utils"
import { DOMAttributes, memo, useRef } from "react"
import styles from "./Icon.module.scss"

const getIcon = (type: TIcon) => iconTypes.get(type)

/**
 * @prop type Тип иконки
 * @prop [className] класс иконки
 * @prop [color] цвет иконки
 * @prop [height] высота иконки
 * @prop [width] ширина иконки
 * @prop [size] размер иконки
 * @prop [dataTestId] id для тестирования
 */
type TProps = {
  type?: TIcon
  className?: string
  height?: string
  width?: string
  size?: string
  dataTestId?: string
} & DOMAttributes<HTMLSpanElement>

const Component: React.FC<TProps> = props => {
  const { type, className, height, width, size, dataTestId, ...rest } = props

  const iconRef = useRef<HTMLDivElement>(null)

  if (!type) {
    return
  }

  return (
    <div
      className={cn(styles.Icon, className)}
      ref={iconRef}
      data-testid={dataTestId}
      style={{
        height: formatToStringWithPx(height),
        width: formatToStringWithPx(width),
        fontSize: formatToStringWithPx(size),
      }}
      {...rest}
    >
      {getIcon(type)}
    </div>
  )
}

export const Icon = memo(Component)
