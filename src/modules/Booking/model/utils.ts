import {
  BookingDto,
  BookingDtoStatus,
  NewBookingDto,
} from "@/generated/bookings"
import { IBookingForm } from "./types/BookingValidationSchema"
import {
  TBookingGridDay,
  EBookingView,
  TTabForHeader,
} from "./types/BookingGridTypes"
import dayjs, { Dayjs } from "dayjs"
import { DATE_FRONT_FORMAT } from "@/widgets/DatePicker/types"
import isBetween from "dayjs/plugin/isBetween"
import { isBetweenWrapper } from "@/shared/utils/utils"
import { RoomDto } from "@/generated/room"

dayjs.extend(isBetween)

const dateDivider = "-"

export const mapperBookingDTOToFormData = (
  data: BookingDto
): IBookingForm | undefined => {
  if (!data) return
  return {
    petIds: data.pets?.map(pet => pet.id!) || [],
    dateFrom: data.checkInDate,
    dateTo: data.checkOutDate,
    timeFrom: data.checkInTime!,
    timeTo: data.checkOutTime!,
    pricePerDay: data.price,
    fullPrice: data.amount || 0,
    prepayment: data.prepaymentAmount,
    isPrepaymentPaid: data.isPrepaid,
    categories: data.room.categoryDto?.name || "",
    rooms: data.room.number,
    daysAmount: data.daysOfBooking || 0,
    comment: data.comment || "",
  }
}

export const mapperBookingFormDataToDTO = (
  data: IBookingForm
): NewBookingDto => {
  return {
    checkInDate: data.dateFrom,
    checkOutDate: data.dateTo,
    checkInTime: data.timeFrom,
    checkOutTime: data.timeTo,
    price: data.pricePerDay,
    amount: data.pricePerDay * (data.daysAmount || 1),
    prepaymentAmount: data.prepayment,
    isPrepaid: data.isPrepaymentPaid,
    roomId: 22,
    type: "TYPE_BOOKING",
    petIds: [1],
  }
}

//Функция вычисляющая первый день для запроса
export const getFirstDateForBookingGridRequest = (): string => {
  return dayjs().subtract(2, "day").format(DATE_FRONT_FORMAT)
}

/**
 * Функция рассчитывающая полсденюю дату запроса
 * @param type Тип просмотра таблицы бронирований (в зависимости от него, необходимо отчиывать количество дней)
 * @returns дату для запроса
 */
export const getLastDateForBookingGridRequest = (
  type: EBookingView
): string => {
  switch (type) {
    case EBookingView.MONTH:
      return dayjs().add(31, "day").format(DATE_FRONT_FORMAT)
    case EBookingView.THREE_MONTHS:
      return dayjs().add(93, "day").format(DATE_FRONT_FORMAT)
    default:
      return dayjs().add(31, "day").format(DATE_FRONT_FORMAT)
  }
}

/**
 *
 * @param startDate начальная дата от которой нужно отсчитывать дни
 * @param daysCount количество дней, которое нужно добавить после начальной даты (в месячном представлении это 31 день)
 * @param subtract количество дней, которое нжуно отнять от начальной даты (по дефолту 2)
 * @returns массив сгенерированный дней
 */
export const generateDaysForBookingGrid = (
  startDate?: Dayjs,
  daysCount?: number,
  subtract?: number
): TBookingGridDay[] => {
  const days: TBookingGridDay[] = []
  const wholeDays = daysCount ?? 33

  const firstDay = (startDate ?? dayjs()).subtract(subtract || 2, "day")

  for (let i = 0; i < wholeDays; i++) {
    const day = firstDay.add(i, "day")
    days.push({
      day,
      isWeekend: day.day() === 0 || day.day() === 6,
      isToday: day.isSame(dayjs(), "day"),
    })
  }
  return days
}

export const HEADER_TABS: TTabForHeader[] = [
  {
    label: "Месяц",
    value: EBookingView.MONTH,
  },
  {
    label: "День",
    value: EBookingView.DAY,
  },
  {
    label: "Неделя",
    value: EBookingView.WEEK,
  },

  {
    label: "3 месяца",
    value: EBookingView.THREE_MONTHS,
  },
]

export const isWeekend = (day: Dayjs) => day.day() === 0 || day.day() === 6

//Бывают случаи, когда с сервера приходит некорректная дата, ее нужно перебрать для dayjs, иначе он не будет понимать что мы ему даем  за дату
export const convertServerDateToAnFormView = (date: string): string => {
  if (!date.includes(dateDivider)) return date
  const [year, month, day] = date.split(dateDivider)
  return `${day}.${month}.${year}`
}

/** Маппер для статуса бронирования к цвету отображения бронирования */
export const mapBookingStatusToColor: Record<
  Partial<BookingDtoStatus>,
  "#A2E9FF" | "#FEE97E" | "#6EE38F" | "#EBAAFB" | undefined
> = {
  [BookingDtoStatus.STATUS_CHECKED_IN]: "#A2E9FF",
  [BookingDtoStatus.STATUS_INITIAL]: "#FEE97E",
  [BookingDtoStatus.STATUS_CONFIRMED]: "#6EE38F",
  [BookingDtoStatus.STATUS_CHECKED_OUT]: "#EBAAFB",
  [BookingDtoStatus.STATUS_CANCELLED]: undefined,
} as const

/**
 * Функция для преобразования данных в тип который понятен таблице бронирований
 * @param rooms список комнат
 * @returns массив содержащий информацию по категории и комнате
 */
export const getRoomsProperType = (
  rooms: RoomDto[]
): { number: string; category: string; roomId: number }[] =>
  rooms.map(el => ({
    number: el.number,
    category: el.categoryDto?.name || "",
    roomId: el.id,
  }))

export const isDateWithinBooking = (
  date: string,
  checkInDate: string,
  checkOutDate: string
) => {
  return isBetweenWrapper(date, checkInDate, checkOutDate)
}

/**
 * Функция рассчитывающее начало и конец брони, и саму информацию о броне
 * @param bookingsForRoom получаем список бронирований для определнной комнаты
 * @param currentDay день, на котором нужно проверить бронирование
 * @param daysForBookingGrid даты календаря
 * @returns информацию про брони в виде {booking, startIndex, endIndex}
 */
export const getBookingInfo = (
  bookingsForRoom: BookingDto[],
  currentDay: dayjs.Dayjs,
  daysForBookingGrid: TBookingGridDay[]
) => {
  const relevantBookings = bookingsForRoom.filter(booking =>
    isDateWithinBooking(
      currentDay.format(DATE_FRONT_FORMAT),
      booking.checkInDate,
      booking.checkOutDate
    )
  )

  return relevantBookings.map(booking => {
    const startIndex = daysForBookingGrid.findIndex(
      d => d.day.format(DATE_FRONT_FORMAT) === booking.checkInDate
    )
    const endIndex = daysForBookingGrid.findIndex(
      d => d.day.format(DATE_FRONT_FORMAT) === booking.checkOutDate
    )
    return { booking, startIndex, endIndex }
  })
}
