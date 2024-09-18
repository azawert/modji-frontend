import dayjs from "dayjs"
import { DATE_FRONT_FORMAT, IDateRange } from "./types"

/** Функция, которая форматирует дату для правильного отображения на фронте
 * @param date | IDateRange аргрументом может быть одна дата, или диапазон дат
 */
export const formatDate = (date: dayjs.Dayjs | IDateRange): string => {
  if ("start" in date && "end" in date) {
    const startFormat = date.start ? date.start.format(DATE_FRONT_FORMAT) : ""
    const endFormat = date.end ? date.end.format(DATE_FRONT_FORMAT) : ""
    return `${startFormat} - ${endFormat}`
  } else {
    return date.format(DATE_FRONT_FORMAT)
  }
}

/** Функция проверяющая, что дата входит в выбранный месяц (нужно для правильного отображения даты в календаре)
 * @param date дата которую нужно проверить
 * @param selectedMonth выбранный месяц
 */
export const isDateInSelectedMonth = (
  date: dayjs.Dayjs,
  selectedMonth: number
): boolean => {
  return date.month() === selectedMonth
}

/** Меняет первую букву на заглавную
 * @param string
 * @returns Модифицированную строчку
 */
export const transformFirstLetterToUpperCase = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const checkIsDateIsBetween = (
  date: dayjs.Dayjs,
  firstDate: dayjs.Dayjs | null,
  secondDate: dayjs.Dayjs | null
) => {
  if (!firstDate || !secondDate) return
  return date > firstDate && date < secondDate
}

export function updateRange(
  date: dayjs.Dayjs,
  range: IDateRange | null
): IDateRange {
  if (!range?.start || (range?.start && range?.end)) {
    return { start: date, end: null }
  } else if (date.isBefore(range.start)) {
    return { start: date, end: range.start }
  } else {
    return { ...range, end: date }
  }
}
