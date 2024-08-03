import { TIcon } from "@/assets/Icons/types"
import { cn } from "@/lib/utils"
import { CircularProgress, InputBase } from "@mui/material"
import { forwardRef, memo } from "react"
import { Icon } from "./Icon/Icon"
import { EErrorColor, ErrorText } from "@/shared/ui/ErrorText.tsx"

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
} & React.PropsWithChildren &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "color" | "size" | "itemRef"
  >

const disabled = "opacity-50 hover:bg-indigo-100"
const errored = "border-error"

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
    ...rest
  } = props

  const isLeftIconDisplayed =
    iconPosition === TIconInputPosition.LEFT && !isLoading
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="mb-1 text-sm text-basicGreyText active:border-basicBlack text-small">
        {label}
        <span className="font-semibold ml-0.5 text-basicGreyText text-small">
          {isRequired ? "*" : ""}
        </span>
      </span>

      <div style={{ marginBottom, position: "relative" }}>
        <InputBase
          placeholder={placeholder}
          autoComplete="off"
          disabled={isDisabled || isLoading}
          id={id}
          type={type}
          className={cn(
            `border-2 border-basicGrey  rounded-24px focus-within:border-basicBlack py-3 px-5 w-full ${className}`,
            {
              [disabled]: isDisabled,
              [errored]: error,
              ["px-5"]: isTextarea,
            }
          )}
          startAdornment={
            isLeftIconDisplayed ? (
              <Icon type={iconType} />
            ) : isLoading ? (
              <CircularProgress size={16} />
            ) : null
          }
          endAdornment={iconPosition === "right" && <Icon type={iconType} />}
          ref={ref}
          inputProps={{
            maxLength,
          }}
          sx={{
            "& .MuiInputBase-input": {
              padding: 0,
            },
            "& .MuiInputBase-inputMultiline": {
              paddingLeft: "20px",
              paddingTop: "12px",
            },
          }}
          error={!!error}
          multiline={isTextarea}
          minRows={rowsToDisplay}
          {...rest}
        />
        {error && (
          <ErrorText
            color={EErrorColor.RED}
            className="top-full left-0 pt-1 pl-[22px] text-red-500 text-xs"
          >
            {error}
          </ErrorText>
        )}
      </div>
    </label>
  )
})

export const TextField = memo(Component)
