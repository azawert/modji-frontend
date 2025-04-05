import { memo } from "react"

import { PageTitle } from "@/shared/ui/PageTitle"

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
