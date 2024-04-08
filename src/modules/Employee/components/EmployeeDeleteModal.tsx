import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { Close } from "@mui/icons-material"
import { Modal, Box, Typography, IconButton } from "@mui/material"
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 616,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: "0px 8px 16px 0px #00000029",
  p: 4,
}

export const EmployeeDeleteModal: React.FC<TProps> = memo(props => {
  const { employeeName, employeeRole, isOpen, onCancel, onConfirm } = props
  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      aria-labelledby={"modal-delete-employee"}
      aria-describedby={"modal-delete-form"}
    >
      <Box sx={style}>
        <Box display="flex" alignItems="flex-start" marginBottom={"15px"}>
          <Box flexGrow={1}>
            <Typography fontSize={24} fontWeight={800}>
              Удалить сотрудника?
            </Typography>
            <Typography fontSize={16} fontWeight={400} marginTop={2}>
              Сотрудник будет удален из списка ваших сотрудников и восстановить
              его будет невозможно
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={onCancel}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#F6F8FF",
            borderRadius: "16px",
            padding: "10px 15px",
          }}
          marginBottom="15px"
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
          >
            Отменить
          </Button>
          <Button
            size={EButtonSize.Large}
            variant={EButtonVariant.Primary}
            onClick={onConfirm}
            fontWeight={700}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  )
})
