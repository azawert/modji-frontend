import { BookingDto, NewBookingDto } from "@/generated/bookings"
import { IBookingForm } from "./types/BookingValidationSchema"
import {
  TBookingGridDay,
  EBookingView,
  TTabForHeader,
} from "./types/BookingGridTypes"
import dayjs, { Dayjs } from "dayjs"
import { DATE_FRONT_FORMAT } from "@/widgets/DatePicker/types"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

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
    categories: data.room.Category?.name || "",
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

export const getFirstDateForBookingGridRequest = (): string => {
  return dayjs().subtract(2, "day").format(DATE_FRONT_FORMAT)
}

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

export function isBetween(
  date: string, // Дата для проверки
  startDate: string, // Начальная дата диапазона
  endDate: string, // Конечная дата диапазона
  inclusivity: "[]" | "[)" | "(]" | "()" = "[]", // Опции включения/исключения границ
  format: string = "DD.MM.YYYY" // Формат даты
): boolean {
  const targetDate = dayjs(date, format)
  const start = dayjs(startDate, format)
  const end = dayjs(endDate, format)

  switch (inclusivity) {
    case "[]":
      return targetDate.isSameOrAfter(start) && targetDate.isSameOrBefore(end)
    case "[)":
      return targetDate.isSameOrAfter(start) && targetDate.isBefore(end)
    case "(]":
      return targetDate.isAfter(start) && targetDate.isSameOrBefore(end)
    case "()":
      return targetDate.isAfter(start) && targetDate.isBefore(end)
    default:
      throw new Error("Invalid inclusivity option")
  }
}

export const bookings: BookingDto[] = [
  {
    id: 1,
    amount: 15000,
    checkInDate: "01.10.2024",
    checkInTime: "14:00",
    checkOutDate: "05.10.2024",
    checkOutTime: "12:00",
    isPrepaid: true,
    prepaymentAmount: 5000,
    price: 3000,
    status: "STATUS_CONFIRMED",
    type: "TYPE_BOOKING",
    room: {
      id: 101,
      number: "101",
      categoryDto: { id: 1, name: "Стандарт" },
    },
  },
  {
    id: 2,
    amount: 20000,
    checkInDate: "03.10.2024",
    checkInTime: "15:00",
    checkOutDate: "07.10.2024",
    checkOutTime: "11:00",
    isPrepaid: false,
    prepaymentAmount: 0,
    price: 4000,
    status: "STATUS_INITIAL",
    type: "TYPE_BOOKING",
    room: {
      id: 102,
      number: "102",
      categoryDto: { id: 2, name: "Комфорт" },
    },
    comment: "Поздний заезд",
  },
  {
    id: 3,
    amount: 35000,
    checkInDate: "05.10.2024",
    checkOutDate: "10.10.2024",
    isPrepaid: true,
    prepaymentAmount: 15000,
    price: 7000,
    status: "STATUS_CONFIRMED",
    type: "TYPE_BOOKING",
    room: {
      id: 201,
      number: "201",
      categoryDto: { id: 3, name: "Люкс" },
    },
  },
  {
    id: 4,
    amount: 8000,
    checkInDate: "02.10.2024",
    checkInTime: "13:00",
    checkOutDate: "03.10.2024",
    checkOutTime: "10:00",
    isPrepaid: true,
    prepaymentAmount: 4000,
    price: 8000,
    status: "STATUS_CHECKED_IN",
    type: "TYPE_BOOKING",
    room: {
      id: 103,
      number: "103",
      categoryDto: { id: 1, name: "Стандарт" },
    },
  },
  {
    id: 5,
    amount: 12000,
    checkInDate: "06.10.2024",
    checkInTime: "16:00",
    checkOutDate: "08.10.2024",
    checkOutTime: "12:00",
    isPrepaid: false,
    prepaymentAmount: 0,
    price: 6000,
    status: "STATUS_CANCELLED",
    type: "TYPE_BOOKING",
    room: {
      id: 202,
      number: "202",
      categoryDto: { id: 2, name: "Комфорт" },
    },
    reasonOfCancel: "Клиент отменил бронь",
  },
]
