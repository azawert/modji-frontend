import {
  ENotificationType,
  TNotification,
} from "@/contexts/notificationContext/NotificationContext"
import { Box, IconButton, Slide, Snackbar, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react"
import { Icon } from "../Icon/Icon"
import { Button, EButtonSize, EButtonVariant } from "../Button/Button"
import { DATA_TEST_ID_GLOBAL_OBJECT } from "@/shared/constants/test-id"

/** Маппер для получения нужной иконки, для нотификации подтверждения иконка будет не нужна */
const mapperTypeNotificationToIcon: Record<
  ENotificationType,
  JSX.Element | null
> = {
  [ENotificationType.ERROR]: (
    <Icon
      type="ErrorIcon"
      dataTestId={DATA_TEST_ID_GLOBAL_OBJECT.notification.error}
    />
  ),
  [ENotificationType.SUCCESS]: (
    <Icon
      type="SuccessIcon"
      dataTestId={DATA_TEST_ID_GLOBAL_OBJECT.notification.success}
    />
  ),
  [ENotificationType.WARNING]: (
    <Icon
      type="WarningIcon"
      dataTestId={DATA_TEST_ID_GLOBAL_OBJECT.notification.warning}
    />
  ),
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
    handleOneAction,
    onlyOneAction,
    onlyOneActionButtonText,
  } = props
  const [isOpenedNotification, setIsOpenedNotification] = useState(isOpened)

  const handleClose = () => {
    setIsOpenedNotification(false)
  }

  const handleCloseFormAndNotification = () => {
    handleCloseForm?.()
    setIsOpenedNotification(false)
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (isAutoClosable) {
      timerId = setTimeout(() => {
        setIsOpenedNotification(false)
      }, timeout)
    }

    return () => clearTimeout(timerId)
  }, [id, timeout, isAutoClosable])

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
      {(withConfirmationButtons || onlyOneAction) && (
        <Box display="flex" marginTop="14px" gap="18px">
          {withConfirmationButtons && (
            <>
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
            </>
          )}
          {onlyOneAction && (
            <Button
              size={EButtonSize.Small}
              variant={EButtonVariant.Secondary}
              fontSize={12}
              fontWeight={600}
              onClick={handleOneAction}
            >
              {onlyOneActionButtonText}
            </Button>
          )}
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
