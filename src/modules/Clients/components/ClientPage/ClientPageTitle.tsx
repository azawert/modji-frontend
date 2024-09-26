import { PageTitle } from "@/shared/ui/PageTitle.tsx"
import { EButtonVariant } from "@/shared/ui/Button/Button.tsx"

/**
 * Пропсы для заголовка страницы клиентов
 * @prop onClick функция обработчик для кнопки в заголовке страницы
 */
type TProps = {
  onClick: () => void
}

export const ClientPageTitle: React.FC<TProps> = props => {
  return (
    <PageTitle
      title="Карточка клиента"
      buttonText="История бронирваний"
      onClick={props.onClick}
      buttonVariant={EButtonVariant.Secondary}
    />
  )
}
