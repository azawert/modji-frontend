import { memo } from "react"

import { PageTitle } from "@/shared/ui/PageTitle"

/**
 * @prop onClick обработчик для клика по кнопке в хедере
 */
type TProps = {
  onClick: () => void
}

export const EmployeePageTitle: React.FC<TProps> = memo(props => {
  const { onClick } = props
  return (
    <PageTitle
      buttonText="Добавить сотрудника"
      onClick={onClick}
      title="Команда"
    />
  )
})
