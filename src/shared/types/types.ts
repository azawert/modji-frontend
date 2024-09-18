import {
  FieldValues,
  Path,
  RegisterOptions,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"
import { ReactNode } from "react"

/**Тип для определения открытой модалки (создание или редактирование)
 * @prop isOpen - открыта ли модалка
 * @prop isEdit - открыта ли модалка редактирования
 */
export type TOpenModal = {
  isOpen: boolean
  isEdit: boolean
}

/** Тип для модалки с несколькими шагами
 * @type isOpen флаг открытости модалки
 * @type onClose функция обработчик закрытия модального окна
 * @type ariaLabelledby проп для тайтла модалки
 * @type ariaDescribedby проп для тела модалки
 * @type renderHeader рендер заголовка
 * @type title тайтл модалки
 * @type form форма которая возвращается из useForm
 * @type formId айдишник формы, необходим для сабмит кнопки
 * @type onSubmit функция обработчик после успешного заполнения модалки
 * @type steps шаги которые надо отрендерить в модалке
 * @type [nextStepButtonText] кастомный текст для кнопки следующего шага
 * @type [backButtonTextString] кастомный текст для кнопки предыдущего шага
 * @type [handleFormButtonTextString] кастомный текст для кнопки последнего шага
 */
export type TMultiStepModal<K extends FieldValues> = {
  isOpen: boolean
  onClose: () => void
  ariaLabelledby: string
  ariaDescribedby: string
  renderHeader: () => React.ReactNode
  title: string
  form: UseFormReturn<K>
  formId: string
  onSubmit: SubmitHandler<K>
  steps: TStep<K>[]
  nextStepButtonText?: string
  backButtonTextString?: string
  handleFormButtonTextString?: string
}

/** Тип для шага в модалке
 * @type title тайтл для шага
 * @type fields поля которые необходимо отредендирить
 * @type [description] доп описания поля
 */
export type TStep<K extends FieldValues> = {
  title: string
  fields: TField<K>[]
  description?: string
}

/** Тип для поля в модалке
 * @type name название поля из rhf
 * @type label лейбл для инпута
 * @type validation правила валидации для поля
 * @type [type] тип поля
 * @type [placeholder] плейсхолдер для инпута
 * @type [isRequired] обязательность поля
 * @type [isPhoneField] флаг для отображения поля под номер телефона
 */
export type TField<K extends FieldValues> = {
  name: Path<K>
  label: string
  validation: RegisterOptions
  type?: string
  placeholder?: string
  isRequired?: boolean
  isPhoneField?: boolean
}

/** Тип для пропсов карточки клиента
 * @prop renderHeader рендер заголовка
 * @prop renderMainContent рендер основного контента
 * @prop [renderNoData] рендер если данных нет
 * @prop [renderErrorState] рендер состояния ошибки
 * */
export interface ICardFullProps {
  renderHeader: () => ReactNode
  renderMainContent: () => ReactNode
  renderNoData?: () => ReactNode
  renderErrorState?: () => ReactNode
}
