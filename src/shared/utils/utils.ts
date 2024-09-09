import {
  ENotificationType,
  NotificationContext,
} from "@/contexts/notificationContext/NotificationContext"
import { useContext } from "react"
import dayjs from "dayjs"

export const generateUniqueId = () => {
  const dateStr = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)

  return `${dateStr}-${randomStr}`
}
export const useAddErrorNotification = () => {
  const { addNotification } = useContext(NotificationContext)

  return (text: string, subText?: string) => {
    addNotification({
      id: generateUniqueId(),
      type: ENotificationType.ERROR,
      isOpened: true,
      text,
      isAutoClosable: true,
      subText,
    })
  }
}

export const useAddSuccessNotification = () => {
  const { addNotification } = useContext(NotificationContext)

  return (text: string, subText?: string) => {
    addNotification({
      id: generateUniqueId(),
      type: ENotificationType.SUCCESS,
      isOpened: true,
      text,
      isAutoClosable: true,
      subText,
    })
  }
}

export const useAddWarningNotification = () => {
  const { addNotification } = useContext(NotificationContext)

  return (text: string, handleButtonClick: () => void, buttonText: string) => {
    addNotification({
      id: generateUniqueId(),
      type: ENotificationType.WARNING,
      isOpened: true,
      text,
      isAutoClosable: true,
      onlyOneAction: true,
      handleOneAction: handleButtonClick,
      onlyOneActionButtonText: buttonText,
    })
  }
}

export const renderValueWithPostfix = <T>(value: T, postfix?: string): string =>
  `${value}${postfix}`

export const convertServerDataToClientData = (date: string): string => {
  return dayjs(date).format("DD.MM.YYYY")
}

/** Функция которая будет приводить номер телефона с формы в вид подходящий для сервера */
export const formatPhoneNumberToServerRequest = (phone: string) => {
  const formattedPhoneNumber = phone.replace(/[^\d]/g, "")

  return `+${formattedPhoneNumber}`
}

/** Функция которая будет приводить номер телефона с респонса в вид подходящий для формы */
export const formatServerPhoneNumberToForm = (phoneNumber: string) => {
  if (!phoneNumber.startsWith("+7")) {
    console.error("Неизвестный формат")
    return phoneNumber
  }
  const { match } = getRawValueAndIfItsMatchesTheMask(
    phoneNumber,
    /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/
  )

  if (!match) {
    console.error("Некорректный формат")
    return
  }

  return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
}

/** Функция обработчик для маскированного инпута под номер телефона
 * @param phoneNumber значение которое надо отформотировать
 * @returns возвращает либо частично отформатированный номер телефона, либо же полностью готовый в виде +7 (000) 000-00-00
 */
export const formatPhoneNumber = (phoneNumber: string) => {
  const { cleaned, match } = getRawValueAndIfItsMatchesTheMask(
    phoneNumber,
    /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/
  )

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
  } else if (cleaned.length < 12) {
    let formatted = "+7 ("
    if (cleaned.length > 1) {
      formatted += cleaned.slice(1, 4)
    }
    if (cleaned.length >= 4) {
      formatted += `) ${cleaned.slice(4, 7)}`
    }
    if (cleaned.length >= 7) {
      formatted += `-${cleaned.slice(7, 9)}`
    }
    if (cleaned.length >= 9) {
      formatted += `-${cleaned.slice(9, 11)}`
    }
    return formatted
  } else {
    return phoneNumber
  }
}

/** Фунцкия которая будет удалять нечисловые символы (-,^ и тд) и возвращать соответствует ли очищенная строка маске
 * @param value значение которое надо очистить
 * @param mask маска с которой надо сравнить полученное значение
 * @returns саму очищенную строку и признак совпадения с маской
 */
export function getRawValueAndIfItsMatchesTheMask(value: string, mask: RegExp) {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(mask)

  return {
    cleaned,
    match,
  }
}
