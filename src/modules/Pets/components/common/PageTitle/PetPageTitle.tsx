import { EButtonVariant } from "@/shared/ui/Button/Button"
import { PageTitle } from "@/shared/ui/PageTitle"

export const PetPageTitle: React.FC = () => {
  return (
    <PageTitle
      title="Создание нового питомца"
      buttonVariant={EButtonVariant.Secondary}
    />
  )
}
