import { PageTitle } from "@/shared/ui/PageTitle"
import { memo } from "react"

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
