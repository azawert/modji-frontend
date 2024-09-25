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
 * @prop [rangeValue] значение для диапазона дат
 */
export type TDatePickerProps = {
  onClose: () => void
  isOpen: boolean
  onChange?: (date: dayjs.Dayjs) => void
  onChangeRange?: (range: IDateRange) => void
  isRange?: boolean
  disableFutureDates?: boolean
  value?: dayjs.Dayjs
  rangeValue?: IDateRange
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
