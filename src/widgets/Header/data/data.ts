import logo from "../../../assets/logo.svg"

/**
 * @prop label текст для отображения
 * @prop href сама ссылка для перенаправления
 */
export type HeaderPageLink = {
  label: string
  href: string
}

/**
 * @prop links массив ссылок для отображения
 * @prop srcLogo ссылка на иконку для логотипа
 * @prop logoTitle текст для логотипа
 * @prop handleActiveButtonClick функция для обработки клика по кнопке
 */
export type TPropsForHeader = {
  links: HeaderPageLink[]
  srcLogo: string
  logoTitle: string
  handleActiveButtonClick: () => void
}

const LINKS_FOR_HEADER: HeaderPageLink[] = [
  {
    label: "Меню",
    href: "/",
  },
  {
    label: "Сетка бронирований",
    href: "/bookings",
  },
  {
    label: "Заезды/Выезды",
    href: "/departures",
  },
]

export const PropsForHeader: TPropsForHeader = {
  links: LINKS_FOR_HEADER,
  srcLogo: logo,
  logoTitle: "Pet’s home",
  handleActiveButtonClick: () => {},
}
