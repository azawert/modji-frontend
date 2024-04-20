import { PageTitle } from "@/shared/ui/PageTitle"
import { memo } from "react"

/**
 * @prop onClick обработчик для клика по кнопке в хедере
 */
type TProps = {
  onClick: () => void
}

export const RoomsPageTitle: React.FC<TProps> = memo(props => {
  const { onClick } = props
  return (
    <PageTitle
      buttonText="Создать новый номер"
      onClick={onClick}
      title="Номера"
    />
  )
})
