import { EButtonVariant } from "@/shared/ui/Button/Button"
import { PageTitle } from "@/shared/ui/PageTitle"

interface Props {
  title: string
}

export const PetPageTitle: React.FC<Props> = ({ title }) => {
  return <PageTitle title={title} buttonVariant={EButtonVariant.Secondary} />
}
