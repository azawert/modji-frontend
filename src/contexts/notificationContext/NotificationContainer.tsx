import { Notification } from "@/shared/ui/Notification"
import { useNotification } from "./useNotificationContext"

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification()

  return (
    <>
      {notifications.map(notification => (
        <Notification {...notification} key={notification.id} />
      ))}
    </>
  )
}
