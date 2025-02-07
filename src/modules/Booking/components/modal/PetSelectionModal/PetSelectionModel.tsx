import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { Box, Dialog, DialogTitle } from "@mui/material"

interface ShortClientModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const PetSelectionModal: React.FC<ShortClientModalProps> = ({
  children,
  isOpen: isModalOpen,
  onClose,
}) => {
  return (
    <Dialog
      open={isModalOpen}
      maxWidth="lg"
      onClose={onClose}
      aria-labelledby="modal-booking-title"
      aria-describedby="modal-booking-description"
      style={{ overflow: "visible !important" }}
      sx={{
        "& .MuiDialogTitle-root": {
          padding: "40px 64px 0",
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "656px",
          overflow: "visible !important",
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="flex-start"
        padding="0"
        fontSize={24}
        fontWeight={800}
      >
        Питомцы
      </DialogTitle>
      <div className="flex flex-col gap-2 p-8">
        {children}
        <Box display={"flex"} marginTop="8px" justifyContent={"space-evenly"}>
          <Button
            variant={EButtonVariant.Secondary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button
            onClick={onClose}
            variant={EButtonVariant.Primary}
            size={EButtonSize.Large}
            fontSize={16}
            fontWeight={700}
          >
            Сохранить
          </Button>
        </Box>
      </div>
    </Dialog>
  )
}
