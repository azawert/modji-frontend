import {
  ChangeEvent,
  FocusEvent,
  useState,
  forwardRef,
  Ref,
  KeyboardEvent,
  useEffect,
} from "react"
import { TextField } from "./TextField"
import { formatPhoneNumber } from "../utils/utils"

/** Пропсы для компонента кастомного инпута под номер телефона
 * @prop value значение инпута
 * @prop onChange колбек для обработки изменения значения
 * @prop id уникальный идентификатор для инпута
 * @prop [placeholder] плейсхолдер (по умолчанию +7 (000) 000-00-00)
 * @prop [error] текст ошибки
 */
interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  id: string
  label: string
  isRequired?: boolean
  placeholder?: string
  error?: string
}
//TODO добавить возможность использования разных кодов страны и масок для телефона
export const PhoneInput = forwardRef(
  (
    {
      value,
      onChange,
      placeholder = "+7 (000) 000-00-00",
      id,
      error,
      label,
      isRequired,
    }: PhoneInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [inputValue, setInputValue] = useState<string>(value || "")

    //Есть кейсы, когда номер уже введен частично, и пользователь переходит к другому шагу, или компонент еще по каким-то причинам анмаунтиться
    //тогда нужно при обратном маунте уже отформатировать номер
    useEffect(() => {
      if (inputValue.length) {
        setInputValue(formatPhoneNumber(value))
      }
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      if (rawValue.length === 12) return
      const formattedValue = formatPhoneNumber(rawValue)
      setInputValue(formattedValue)
      onChange(rawValue)
    }

    const handleInputFocus = () => {
      if (inputValue === "") {
        setInputValue("+7 (")
      }
    }

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "+7 (") {
        setInputValue("")
        onChange("")
      }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        const lastInputElement = [...inputValue].pop()
        //Код страны и скобку идущую после кода нельзя удалять
        if (lastInputElement !== "(") {
          setInputValue(inputValue.slice(0, inputValue.length - 1))
          e.preventDefault()
        }
      }
    }

    return (
      <TextField
        ref={ref}
        onChange={handleInputChange}
        placeholder={placeholder}
        value={inputValue}
        id={id}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        error={error}
        onKeyDown={handleKeyDown}
        label={label}
        isRequired={isRequired}
      />
    )
  }
)
