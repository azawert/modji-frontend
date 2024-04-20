import { PageTitle } from "@/shared/ui/PageTitle"

/** Пропсы для заголовка страницы категории
 * onClick функция обработчик для открытия модального окна
 */
type TProps = {
  onClick: () => void
}

export const CategoriesTitle: React.FC<TProps> = props => {
  return (
    <PageTitle
      title="Категории номеров"
      buttonText="Создать новую категорию"
      onClick={props.onClick}
    />
  )
}
