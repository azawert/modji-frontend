import { forwardRef, memo } from "react"

import { CircularProgress } from "@mui/material"

import { TIcon } from "@/assets/Icons/types"
import { cn } from "@/lib/utils"

import { Icon } from "../../Icon/Icon"
import { CustomInputBase } from "../CustomInputBase/CustomInputBase"
import { FieldError } from "../FieldError/FieldError"
import { Label } from "../Label/Label"

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
 * @prop [isTextarea] флаг для отображения textarea
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
  className?: string
  marginBottom?: string
  isTextarea?: boolean
  rowsToDisplay?: number
  type?: string
  isPhone?: boolean
  hasSpaceForLabel?: boolean
} & React.PropsWithChildren &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "color" | "size" | "itemRef"
  >

const Component = forwardRef<HTMLInputElement, TProps>((props, ref) => {
  const {
    id,
    placeholder,
    isDisabled,
    isRequired,
    label,
    error,
    isLoading,
    iconPosition,
    iconType,
    maxLength,
    className,
    marginBottom,
    isTextarea,
    rowsToDisplay = 3,
    type,
    width,
    hasSpaceForLabel = true,
    ...rest
  } = props

  const isLeftIconDisplayed =
    iconPosition === TIconInputPosition.LEFT && !isLoading
  const isRightIconDisplayed =
    iconPosition === TIconInputPosition.RIGHT && !isLoading

  const LoadingContent = isLoading ? <CircularProgress size={16} /> : null
  const IconContent = isLoading ? LoadingContent : <Icon type={iconType} />

  const labelValue = rest.value ? label || "" : ""

  return (
    <label htmlFor={id} className="flex flex-col" style={{ width }}>
      {hasSpaceForLabel && <Label label={labelValue} isRequired={isRequired} />}

      <div style={{ marginBottom, position: "relative", width }}>
        <CustomInputBase
          placeholder={placeholder}
          autoComplete="off"
          disabled={isDisabled || isLoading}
          id={id}
          type={type}
          className={cn(className, { ["px-5"]: isTextarea })}
          startAdornment={isLeftIconDisplayed && IconContent}
          endAdornment={isRightIconDisplayed && IconContent}
          ref={ref}
          inputProps={{ maxLength }}
          error={!!error}
          multiline={isTextarea}
          minRows={rowsToDisplay}
          {...rest}
        />{" "}
        <FieldError error={error || ""} />
      </div>
    </label>
  )
})

export const TextField = memo(Component)
