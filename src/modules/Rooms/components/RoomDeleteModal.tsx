import { memo, useCallback } from "react"

import { Close } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { DeleteModal } from "@/shared/ui/modal/DeleteModal"
import { renderValueWithPostfix } from "@/shared/utils/utils"

/** Пропы для модалки
 * @prop isOpen флаг открытия модального окна
 * @prop employeeName фио сотрудника
 * @prop employeeRole должность сотрудника
 * @prop onCancel обработчик закрытия окна
 * @prop onConfirm обработчик удаления сотрудника
 */
type TProps = {
  isOpen: boolean
  roomCategory?: string
  roomNumber?: string
  onCancel: () => void
  onConfirm: () => void
}

export const RoomDeleteModal: React.FC<TProps> = memo(props => {
  const { roomCategory, roomNumber, isOpen, onCancel, onConfirm } = props

  const renderHeader = useCallback(
    (): React.ReactNode => (
      <Box>
        <IconButton onClick={onCancel}>
          <Close />
        </IconButton>
      </Box>
    ),
    [onCancel],
  )
  const renderMainContent = useCallback(
    (): React.ReactNode => (
      <>
        <Typography fontSize={24} fontWeight={800} mb="24px">
          Удалить номер?
        </Typography>
        <Typography fontSize={16} fontWeight={400} mb="24px">
          Номер будет перемещен в раздел Удаленные
        </Typography>
      </>
    ),
    [],
  )
  const renderSubText = useCallback(
    () => (
      <>
        <Typography fontWeight={700} fontSize={16}>
          {roomCategory}
        </Typography>
        <Typography fontSize={16} fontWeight={400}>
          {renderValueWithPostfix(roomNumber, " номер комнаты")}
        </Typography>
      </>
    ),
    [roomCategory, roomNumber],
  )

  const renderFooter = useCallback(
    () => (
      <>
        <Button
          size={EButtonSize.Large}
          variant={EButtonVariant.Secondary}
          onClick={onCancel}
          fontWeight={700}
          fontSize={16}
        >
          Отменить
        </Button>
        <Button
          size={EButtonSize.Large}
          variant={EButtonVariant.Primary}
          onClick={onConfirm}
          fontWeight={700}
          fontSize={16}
        >
          Удалить
        </Button>
      </>
    ),
    [onConfirm, onCancel],
  )
  return (
    <DeleteModal
      renderHeader={renderHeader}
      isOpen={isOpen}
      ariaDescribedby="modal-delete-room-form"
      ariaLabelledby="modal-delete-room"
      onClose={onCancel}
      renderMainContent={renderMainContent}
      renderSubText={renderSubText}
      renderFooter={renderFooter}
    />
  )
})
