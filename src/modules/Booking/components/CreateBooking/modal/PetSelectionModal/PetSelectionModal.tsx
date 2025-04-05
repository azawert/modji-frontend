import { Box } from "@mui/material"

import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { Modal } from "@/shared/ui/modal/Modal"

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
  const renderFooter = () => {
    return (
      <Box
        display={"flex"}
        width={"100%"}
        marginTop="8px"
        justifyContent={"space-evenly"}
      >
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
    )
  }

  const renderBody = () => {
    return <div>{children}</div>
  }

  const renderHeader = () => {
    return (
      <Box className="ml-10 pt-8 font-bold" sx={{ fontSize: "24px" }}>
        Питомцы
      </Box>
    )
  }

  return (
    <Modal
      ariaDescribedby="pet-create"
      ariaLabelledby="pet-create"
      isOpen={isModalOpen}
      onClose={onClose}
      renderFooter={renderFooter}
      renderMainContent={renderBody}
      renderHeader={renderHeader}
    />
  )
}
