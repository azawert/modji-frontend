import {
  ENotificationType,
  TNotification,
} from "@/contexts/notificationContext/NotificationContext"
import { useNotification } from "@/contexts/notificationContext/useNotificationContext"
import { Box, IconButton, Slide, Snackbar, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react"
import { Icon } from "./Icon/Icon"
import { Button, EButtonSize, EButtonVariant } from "./Button"

/** Маппер для получения нужной иконки, для нотификации подтверждения иконка будет не нужна */
const mapperTypeNotificationToIcon: Record<
  ENotificationType,
  JSX.Element | null
> = {
  [ENotificationType.ERROR]: <Icon type="ErrorIcon" />,
  [ENotificationType.SUCCESS]: <Icon type="SuccessIcon" />,
  [ENotificationType.CONFIRMATION]: null,
}
export const Notification: React.FC<TNotification> = props => {
  const {
    id,
    text,
    type,
    handleCloseForm,
    isAutoClosable = false,
    timeout = 5000,
    title,
    horizontal = "right",
    vertical = "top",
    subText,
    withConfirmationButtons,
    cancelButtonText,
    confirmButtonText,
    isOpened,
    notificationWidth = "320",
  } = props
  const { removeNotification } = useNotification()
  const [isOpenedNotification, setIsOpenedNotification] = useState(isOpened)

  const handleClose = () => {
    removeNotification(id)
    setIsOpenedNotification(false)
  }

  const handleCloseFormAndNotification = () => {
    removeNotification(id)
    handleCloseForm?.()
    setIsOpenedNotification(false)
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (isAutoClosable) {
      timerId = setTimeout(() => {
        removeNotification(id)
        setIsOpenedNotification(false)
      }, timeout)
    }

    return () => clearTimeout(timerId)
  }, [id, removeNotification, timeout, isAutoClosable])

  const renderMainContent = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      position="relative"
    >
      {mapperTypeNotificationToIcon[type] && (
        <div className="mb-1">{mapperTypeNotificationToIcon[type]}</div>
      )}
      {title && (
        <Typography
          fontSize={18}
          fontWeight={800}
          className="mb-1"
          textAlign="center"
        >
          {title}
        </Typography>
      )}
      <Typography
        fontSize={16}
        fontWeight={700}
        className="mb-1"
        textAlign="center"
      >
        {text}
      </Typography>
      {subText && (
        <Typography
          className="underline mb-1"
          fontSize={14}
          fontWeight={400}
          textAlign="center"
        >
          {subText}
        </Typography>
      )}
      {withConfirmationButtons && (
        <Box display="flex" marginTop="14px" gap="18px">
          <Button
            size={EButtonSize.Small}
            variant={EButtonVariant.Primary}
            onClick={handleClose}
            fontWeight={600}
          >
            {cancelButtonText || "Продолжить заполнение"}
          </Button>
          <Button
            size={EButtonSize.Small}
            variant={EButtonVariant.Secondary}
            onClick={handleCloseFormAndNotification}
            fontWeight={600}
          >
            {confirmButtonText || "Выйти"}
          </Button>
        </Box>
      )}
      <Box position="absolute" top={-35} right={-35} padding="1px">
        <IconButton onClick={handleClose}>
          <CloseIcon fill="black" />
        </IconButton>
      </Box>
    </Box>
  )

  return (
    <Slide in={isOpenedNotification} mountOnEnter unmountOnExit direction="up">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={isOpenedNotification}
        key={id}
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "0px 8px 16px 0px #00000029",
          borderRadius: "16px",
          width: notificationWidth + "px",
          padding: "32px",
        }}
      >
        {renderMainContent()}
      </Snackbar>
    </Slide>
  )
}
