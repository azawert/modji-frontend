import { PageTitle } from "@/shared/ui/PageTitle.tsx"

/** Пропсы для заголовка страницы клиентов
 * onClick функция обработчик для открытия модального окна
 */
type TProps = {
  onClick: () => void
}

export const ClientsTitle: React.FC<TProps> = props => {
  return (
    <PageTitle
      title="Клиенты"
      buttonText="Добавить клиента"
      onClick={props.onClick}
    />
  )
}
