import {
  ENotificationType,
  NotificationContext,
} from "@/contexts/notificationContext/NotificationContext"
import { useContext } from "react"

export const generateUniqueId = () => {
  const dateStr = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)

  return `${dateStr}-${randomStr}`
}
export const useAddErrorNotification = () => {
  const { addNotification } = useContext(NotificationContext)

  const addErrorNotification = (text: string, subText?: string) => {
    addNotification({
      id: generateUniqueId(),
      type: ENotificationType.ERROR,
      isOpened: true,
      text,
      isAutoClosable: true,
      subText,
    })
  }

  return addErrorNotification
}

export const useAddSuccessNotification = () => {
  const { addNotification } = useContext(NotificationContext)

  const addSuccessNotification = (text: string, subText?: string) => {
    addNotification({
      id: generateUniqueId(),
      type: ENotificationType.SUCCESS,
      isOpened: true,
      text,
      isAutoClosable: true,
      subText,
    })
  }

  return addSuccessNotification
}

export const useAddWarningNotification = () => {
  const { addNotification } = useContext(NotificationContext)

  const addWarningNotification = (
    text: string,
    handleButtonClick: () => void,
    buttonText: string
  ) => {
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

  return addWarningNotification
}

export const renderValueWithPostfix = <T>(value: T, postfix?: string): string =>
  `${value}${postfix}`
