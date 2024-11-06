import {
  FieldValues,
  Path,
  RegisterOptions,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"
import { ReactNode } from "react"
import { SelectData } from "../ui/Select"

/**Тип для определения открытой модалки (создание или редактирование)
 * @prop isOpen - открыта ли модалка
 * @prop isEdit - открыта ли модалка редактирования
 */
export type TOpenModal = {
  isOpen: boolean
  isEdit: boolean
}

/**
 * Тип для модалки с несколькими шагами
 * isOpen флаг открытости модалки
 * onClose функция обработчик закрытия модального окна
 * ariaLabelledby проп для тайтла модалки
 * ariaDescribedby проп для тела модалки
 * renderHeader рендер заголовка
 * title тайтл модалки
 * form форма которая возвращается из useForm
 * formId айдишник формы, необходим для сабмит кнопки
 * onSubmit функция обработчик после успешного заполнения модалки
 * steps шаги которые надо отрендерить в модалке
 * [nextStepButtonText] кастомный текст для кнопки следующего шага
 * [backButtonTextString] кастомный текст для кнопки предыдущего шага
 * [handleFormButtonTextString] кастомный текст для кнопки последнего шага
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
  modalWidth?: string
}

/**
 * Тип для шага в модалке
 * title тайтл для шага
 * fields поля которые необходимо отредендирить
 * [description] доп описания поля
 */
export type TStep<K extends FieldValues> = {
  title: string
  fields: TField<K>[]
  description?: string
}

/**
 * Тип для поля в модалке
 * name название поля из rhf
 * label лейбл для инпута
 * validation правила валидации для поля
 * [type] тип поля
 * [placeholder] плейсхолдер для инпута
 * [isRequired] обязательность поля
 * [isPhoneField] флаг для отображения поля под номер телефона
 */
export type TField<K extends FieldValues> = {
  name: Path<K>
  label: string
  validation: RegisterOptions<K>
  type?: string
  placeholder?: string
  isRequired?: boolean
  isPhoneField?: boolean

  isSelect?: boolean
  options?: SelectData[]

  isCheckbox?: boolean

  isGrouped?: boolean
  fields?: TField<K>[]
}

/**
 * Тип для пропсов карточки клиента
 * renderHeader рендер заголовка
 * renderMainContent рендер основного контента
 * [renderNoData] рендер если данных нет
 * [renderErrorState] рендер состояния ошибки
 */
export interface ICardFullProps {
  renderHeader: () => ReactNode
  renderMainContent: () => ReactNode
  renderNoData?: () => ReactNode
  renderErrorState?: () => ReactNode
}
