import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { DeleteModal } from "@/shared/ui/modal/DeleteModal"
import { Close } from "@mui/icons-material"
import { Box, Typography, IconButton } from "@mui/material"
import { memo, useCallback } from "react"

/** Пропы для модалки
 * @prop isOpen флаг открытия модального окна
 * @prop employeeName фио сотрудника
 * @prop employeeRole должность сотрудника
 * @prop onCancel обработчик закрытия окна
 * @prop onConfirm обработчик удаления сотрудника
 */
type TProps = {
  isOpen: boolean
  employeeName?: string
  employeeRole?: string
  onCancel: () => void
  onConfirm: () => void
}

export const EmployeeDeleteModal: React.FC<TProps> = memo(props => {
  const { employeeName, employeeRole, isOpen, onCancel, onConfirm } = props

  const renderHeader = useCallback(
    (): React.ReactNode => (
      <Box>
        <IconButton onClick={onCancel}>
          <Close />
        </IconButton>
      </Box>
    ),
    [onCancel]
  )
  const renderMainContent = useCallback(
    (): React.ReactNode => (
      <>
        <Typography fontSize={24} fontWeight={800} mb="24px">
          Удалить сотрудника?
        </Typography>
        <Typography fontSize={16} fontWeight={400} mb="24px">
          Сотрудник будет удален из списка ваших сотрудников и восстановить его
          будет невозможно
        </Typography>
      </>
    ),
    []
  )
  const renderSubText = useCallback(
    () => (
      <>
        <Typography fontWeight={700} fontSize={16}>
          {employeeName}
        </Typography>
        <Typography fontSize={16} fontWeight={400}>
          {employeeRole}
        </Typography>
      </>
    ),
    [employeeName, employeeRole]
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
    [onConfirm, onCancel]
  )
  return (
    <DeleteModal
      renderHeader={renderHeader}
      isOpen={isOpen}
      ariaDescribedby="modal-delete-form"
      ariaLabelledby="modal-delete-employee"
      onClose={onCancel}
      renderMainContent={renderMainContent}
      renderSubText={renderSubText}
      renderFooter={renderFooter}
    />
  )
})
