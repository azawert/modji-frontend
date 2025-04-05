import { Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useForm } from "react-hook-form"

import { MultiStepModal } from "@/shared/ui/modal/MultiStepModal.tsx"
import { addConfirmationNotification } from "@/shared/utils/utils.ts"

import { NewOwnerDto } from "@/generated/owners.ts"

import { steps } from "../../const.ts"

type TProps = {
  onClose: () => void
  isOpen: boolean
  handleCreateClient: (data: NewOwnerDto) => void
}

export const CreateNewClientModal = ({
  handleCreateClient,
  isOpen,
  onClose,
}: TProps) => {
  const form = useForm<NewOwnerDto>({
    mode: "all",
  })
  const confirmationNotification = addConfirmationNotification()

  const onCloseAndReset = () => {
    onClose()
    form.reset()
  }

  const handleCloseModal = () => {
    if (form.formState.isDirty) {
      confirmationNotification(onCloseAndReset)
    } else {
      onCloseAndReset()
    }
  }

  return (
    <MultiStepModal
      ariaDescribedby="createnewclientheader"
      ariaLabelledby="createnewclientbody"
      form={form}
      formId="id"
      isOpen={isOpen}
      onClose={handleCloseModal}
      onSubmit={handleCreateClient}
      renderHeader={() => (
        <IconButton onClick={handleCloseModal}>
          <Close />
        </IconButton>
      )}
      steps={steps}
      title="Новый клиент"
    />
  )
}
