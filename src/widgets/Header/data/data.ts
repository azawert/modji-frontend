import logo from "../../../assets/logo.svg"
import { TIcon } from "@/assets/Icons/types.tsx"

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

/**
 * @prop icon Иконка для опции в выпадающем меню
 * @prop label лейбл для опции в выпадающем меню
 * @prop [handleLinkClick] обработчик клика по опции из выпадающего списка
 * */

export type TDropdownMenuOption = {
  icon: TIcon
  label: string
  handleLinkClick?: (navigate: (path: string) => void) => void
}

type TDropdownMenu = {
  labelLink: string
  options: TDropdownMenuOption[]
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

/** Набор выпадающих списков который смаплен с линкой из хедера */
const DROPDOWN_MENUS: TDropdownMenu[] = [
  {
    labelLink: "Меню",
    options: [
      {
        label: "Команда",
        icon: "TeamIcon",
        handleLinkClick: navigate => navigate("/"),
      },
      {
        label: "Номера",
        icon: "RoomIcon",
        handleLinkClick: navigate => navigate("/rooms"),
      },
      {
        label: "Категории номеров",
        icon: "CategoryIcon",
        handleLinkClick: navigate => navigate("/categories"),
      },
      {
        label: "Клиенты",
        icon: "ClientIcon",
        handleLinkClick: navigate => navigate("/clients"),
      },
    ],
  },
]

/** Функция определяющая какой выпадающий список нужно вернуть в зависимости от лейбла на который навелись
 * @param label лейлб на который навелись
 */
export const getDropDownMenuOptions = (
  label?: string
): TDropdownMenuOption[] | undefined =>
  DROPDOWN_MENUS.find(({ labelLink }) => labelLink === label)?.options
