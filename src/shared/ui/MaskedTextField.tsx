import { ChangeEvent, useState, useEffect, forwardRef } from "react"
import { TextField } from "./TextField"

/** Пропы для маскированного текст филда
 * @prop mask маска по которой нужно вводить (example XXXX,XX)
 * @prop value текущее значение инпута
 * @prop onChange функция для обработки изменения значения
 * @prop id идентификатор инпута
 * @prop placeholder плейсхолдер инпута
 */
interface IMaskedTextField {
  mask: string
  value: string
  onChange: (value: string) => void
  id: string
  placeholder: string
  label: string
}

/** Отдельный компонент под специальные инпуты, где нужно вводить что-то в определенной маске, например номер телефона */
export const MaskedTextField = forwardRef<HTMLInputElement, IMaskedTextField>(
  ({ mask, onChange, label, value, id, placeholder }, ref) => {
    const [inputValue, setInputValue] = useState<string>(value)

    useEffect(() => {
      setInputValue(value)
    }, [value])

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^0-9,]/g, "")
      const commaIndex = rawValue.indexOf(",")
      let integerPart = rawValue
      let fractionalPart = ""

      if (commaIndex !== -1) {
        integerPart = rawValue.slice(0, commaIndex)
        fractionalPart = rawValue.slice(commaIndex + 1)
      }

      // Ограничиваем количество цифр слева от запятой
      const maxIntegerDigits = mask.split(",")[0]?.length
      if (integerPart.length > maxIntegerDigits) {
        integerPart = integerPart.slice(0, maxIntegerDigits)
      }

      // Ограничиваем количество цифр справа от запятой
      const maxFractionalDigits = mask.split(",")[1]?.length || 0
      if (fractionalPart.length > maxFractionalDigits) {
        fractionalPart = fractionalPart.slice(0, maxFractionalDigits)
      }

      let maskedValue = integerPart
      if (fractionalPart.length > 0 || commaIndex !== -1) {
        maskedValue += "," + fractionalPart
      }

      setInputValue(maskedValue)
      onChange(maskedValue)
    }

    return (
      <TextField
        ref={ref}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChangeInput}
        label={label}
      />
    )
  }
)
