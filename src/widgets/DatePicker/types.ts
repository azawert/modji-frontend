import dayjs from "dayjs"

/**
 * Пропы для датапикера
 * @prop onClose функция закрытия датапикера
 * @prop isOpen флаг открытости датапикера
 * @prop [onChange] функция обработчик одной даты
 * @prop [onChangeRange] функция обработчик диапазона даты
 * @prop [isRange] флаг для выбора диапазона дат
 * @prop [disableFutureDates] флаг для отключения дат после текущей
 * @prop [value] значение для одной даты
 * @prop [minDate] минимальная дата
 * @prop [maxDate] максимальная дата
 * @prop [rangeValue] значение для диапазона дат
 * @prop [disablePastDates] флаг для отключения дат до текущей
 * @prop [cls] класс для корневого элемента
 */
export type TDatePickerProps = {
  onClose: () => void
  isOpen: boolean
  onChange?: (date: dayjs.Dayjs) => void
  onChangeRange?: (range: IDateRange) => void
  isRange?: boolean
  disableFutureDates?: boolean
  value?: dayjs.Dayjs | null
  minDate?: dayjs.Dayjs | null
  maxDate?: dayjs.Dayjs | null
  rangeValue?: IDateRange
  disablePastDates?: boolean
  cls?: string
}

/**
 * Тип для вида календаря
 * day обычное отображение календаря
 * month месячное представление календаря
 * year годовое представление календаря
 */
export type TCalendarView = "day" | "month" | "year"

/**
 * Тип для диапазона дат
 * start начальная дата
 * end конечная дата
 */
export interface IDateRange {
  start: dayjs.Dayjs | null
  end: dayjs.Dayjs | null
}

export const DATE_FRONT_FORMAT = "DD.MM.YYYY"

export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
]
