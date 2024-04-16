import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { DeleteModal } from "@/shared/ui/modal/DeleteModal"
import { Close } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { useCallback } from "react"

/** Пропы для модалки
 * @prop isOpen флаг открытия модального окна
 * @prop employeeName фио сотрудника
 * @prop employeeRole должность сотрудника
 * @prop onCancel обработчик закрытия окна
 * @prop onConfirm обработчик удаления сотрудника
 */
type TProps = {
  isOpen: boolean
  categoryName?: string
  categoryDescription?: string
  onCancel: () => void
  onConfirm: () => void
}

export const CategoriesDeleteModal: React.FC<TProps> = props => {
  const { categoryName, categoryDescription, isOpen, onCancel, onConfirm } =
    props
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
          Удалить категорию?
        </Typography>
      </>
    ),
    []
  )
  const renderSubText = useCallback(
    () => (
      <>
        <Typography fontWeight={700} fontSize={16}>
          {categoryName}
        </Typography>
        <Typography fontSize={16} fontWeight={400}>
          {categoryDescription}
        </Typography>
      </>
    ),
    [categoryName, categoryDescription]
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
      ariaDescribedby="modal-delete-category"
      ariaLabelledby="modal-delete-category-form"
      onClose={onCancel}
      renderMainContent={renderMainContent}
      renderSubText={renderSubText}
      renderFooter={renderFooter}
    />
  )
}
