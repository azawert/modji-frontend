import { TIcon } from "@/assets/Icons/types"
import { cn } from "@/lib/utils"
import { InputBase } from "@mui/material"
import { forwardRef, memo } from "react"
import { Icon } from "./Icon/Icon"

export enum TIconInputPosition {
  LEFT = "left",
  RIGHT = "right",
}

/**
 * @prop id айди для инпута и лейбла
 * @prop placeholder плейсхолдер для инпута
 * @prop [error] ошибка при заполнении поля
 * @prop [isDisabled] флаг для отключенного состояния инпута
 * @prop [isRequired] флаг для отображения обязательности инпута
 * @prop [label] текст для лейбла для инпута
 * @prop [rules] правила валидации для поля (максимальное количество символов и т.д)
 * @prop [iconPosition] позиция иконки в инпуте
 * @prop [iconType] тип иконки для отображения
 * @prop [isLoading] флаг для загрузки
 * @prop [loadingSpinner] компонент для отображения состояния загрузки
 * @prop [maxLength] максимальное значение для ввода
 */
type TProps = {
  id: string
  placeholder: string
  error?: string
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  iconPosition?: TIconInputPosition
  iconType?: TIcon
  isLoading?: boolean
  loadingSpinner?: React.ReactNode
  maxLength?: number
} & React.PropsWithChildren &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "color" | "size" | "itemRef"
  >

const disabled = "opacity-50 hover:bg-indigo-100"
const errored = "border-error"

const Component: React.FC<TProps> = forwardRef((props, inputRef) => {
  const {
    id,
    placeholder,
    isDisabled,
    isRequired,
    label,
    error,
    isLoading,
    loadingSpinner,
    iconPosition,
    iconType,
    maxLength,
    ...rest
  } = props
  return (
    <label htmlFor={id} className="flex flex-col">
      {!isLoading ? (
        <span className="mb-1 text-sm text-basicGreyText active:border-basicBlack">
          {label}
          <span className="font-semibold ml-0.5 text-basicGreyText ">
            {isRequired ? "*" : ""}
          </span>
        </span>
      ) : (
        loadingSpinner
      )}

      <InputBase
        placeholder={placeholder}
        autoComplete="off"
        disabled={isDisabled || isLoading}
        id={id}
        type="text"
        className={cn(
          `border border-basicGrey  rounded-24px focus-within:border-basicBlack py-2 px-5`,
          {
            [disabled]: isDisabled,
            [errored]: error,
          }
        )}
        startAdornment={iconPosition === "left" && <Icon type={iconType} />}
        endAdornment={iconPosition === "right" && <Icon type={iconType} />}
        {...rest}
        ref={inputRef}
        inputProps={{
          maxLength,
        }}
      />
      {error && (
        <span className="text-error font-semibold text-small">{error}</span>
      )}
    </label>
  )
})

export const TextField = memo(Component)
