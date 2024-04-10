import { useContext } from "react"
import { NotificationContext } from "./NotificationContext"

export const useNotification = () => {
  return useContext(NotificationContext)
}
