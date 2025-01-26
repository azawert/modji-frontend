import { eventEmitter } from "@/shared/utils/eventEmitter"
import { PropsWithChildren, createContext, useEffect, useState } from "react"

export enum ENotificationType {
  ERROR = "error",
  SUCCESS = "success",
  CONFIRMATION = "confirmation",
  WARNING = "warning",
}

/**
 * @prop id айди для последующего корректного удаления нотификации
 * @prop type тип алерта, confirmation для выхода с формы, если пользователь заполнил какие-либо поля
 * @prop isOpened флаг открытости (не уверен, что нужен конечно)
 * @prop text текст алерта
 * @prop handleCloseForm обработчик закрытия формы с которой вызывается нотификация для подтверждения выхода
 * @prop [isAutoClosable] флаг для автоматического закрытия нотификации
 * @prop [timeout] время после которого закроется нотификация
 * @prop [title] заголовок алерта (на будущее, вдруг понадобится)
 * @prop [withConfirmationButtons] флаг для отображения кнопок для потдверждения выхода с формы
 * @prop [vertical] расположение нотификации (по дефолту значения заданы, но вдруг надо будет где-то еще разместить)
 * @prop [horizontal] расположение нотификации (по дефолту значения заданы, но вдруг надо будет где-то еще разместить)
 * @prop [subText] подтекст
 * @prop [cancelButtonText] кастомный текст для кнопки отмены
 * @prop [confirmButtonText] кастомный текст для кнопки подтверждения
 * @prop [notificationWidth] ширина нотификации (по дефолту тоже задана, вдруг понадобится другой размер)
 */
export type TNotification = {
  id: string
  type: ENotificationType
  isOpened: boolean
  text: string
  handleCloseForm?: () => void
  isAutoClosable?: boolean
  timeout?: number
  title?: string
  withConfirmationButtons?: boolean
  vertical?: "top" | "bottom"
  horizontal?: "left" | "center" | "right"
  subText?: string
  cancelButtonText?: string
  confirmButtonText?: string
  notificationWidth?: string
  onlyOneAction?: boolean
  handleOneAction?: () => void
  onlyOneActionButtonText?: string
}

/**
 * Тип для контекста нотификации
 * @prop notifications массив нотификаций для отображения
 * @prop addNotification функция для добавления нотификации в массив
 * @prop removeNotification функция для удаления нотификации из массива
 */
type TNotificationContext = {
  notifications: TNotification[]
}

const initialStateForContext: TNotificationContext = {
  notifications: [],
}

export const NotificationContext = createContext<TNotificationContext>(
  initialStateForContext
)

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<TNotification[]>([])

  useEffect(() => {
    const addNotification = (not: TNotification) => {
      if (
        not.type === ENotificationType.CONFIRMATION &&
        notifications.some(
          n => n.type === ENotificationType.CONFIRMATION && n.isOpened
        )
      ) {
        setNotifications(prev =>
          prev.map(n =>
            n.id ===
            notifications.find(
              nd => nd.type === ENotificationType.CONFIRMATION && nd.isOpened
            )?.id
              ? not
              : n
          )
        )
      } else {
        setNotifications(prev => [...prev, not])
      }
    }
    const removeNotification = (id: string) =>
      setNotifications(prev => prev.filter(n => n.id !== id))

    eventEmitter.on("addNotification", addNotification)
    eventEmitter.on("removeNotification", removeNotification)

    return () => {
      eventEmitter.off("addNotification", addNotification)
      eventEmitter.off("removeNotification", removeNotification)
    }
  }, [notifications])
  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  )
}
