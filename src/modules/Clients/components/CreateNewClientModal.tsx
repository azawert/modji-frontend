import { MultiStepModal } from "@/shared/ui/modal/MultiStepModal"
import { steps } from "../const"
import { IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"
import { NewOwnerDto } from "@/generated/owners"
import { useForm } from "react-hook-form"

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
  return (
    <MultiStepModal
      ariaDescribedby="createnewclientheader"
      ariaLabelledby="createnewclientbody"
      form={form}
      formId="id"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCreateClient}
      renderHeader={() => (
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      )}
      steps={steps}
      title="Новый клиент"
    />
  )
}
