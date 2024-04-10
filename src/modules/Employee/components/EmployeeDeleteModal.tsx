import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { Close } from "@mui/icons-material"
import { Box, Typography, IconButton, Dialog, DialogTitle } from "@mui/material"
import { memo } from "react"

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
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby={"modal-delete-employee"}
      aria-describedby={"modal-delete-form"}
      sx={{
        "& .MuiDialogTitle-root": {
          padding: 0,
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="flex-end" padding="0">
        <Box>
          <IconButton onClick={onCancel}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <div className="pb-10 px-16">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={"15px"}
        >
          <Box>
            <Typography fontSize={24} fontWeight={800} mb="24px">
              Удалить сотрудника?
            </Typography>
            <Typography fontSize={16} fontWeight={400} mb="24px">
              Сотрудник будет удален из списка ваших сотрудников и восстановить
              его будет невозможно
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#F6F8FF",
            borderRadius: "16px",
            padding: "16px 16px",
          }}
          marginBottom="40px"
        >
          <Typography fontWeight={700} fontSize={16}>
            {employeeName}
          </Typography>
          <Typography fontSize={16} fontWeight={400}>
            {employeeRole}
          </Typography>
        </Box>
        <Box display={"flex"} marginTop="8px" justifyContent={"space-between"}>
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
        </Box>
      </div>
    </Dialog>
  )
})
