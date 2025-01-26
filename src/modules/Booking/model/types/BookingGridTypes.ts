import { RoomDto } from "@/generated/bookings"
import type { Dayjs } from "dayjs"

/**
 * Тип для определения дня в сетке бронирования
 * @property day - сам день
 * @property isWeekend - флаг для определения является ли день выходным
 * @property isToday - флаг для определения является ли дата сегодняшней
 */
export type TBookingGridDay = {
  day: Dayjs
  isWeekend?: boolean
  isToday?: boolean
}

/**
 * Перечисление видов которые пользователь может выбрать
 */
export enum EBookingView {
  DAY = "day",
  MONTH = "month",
  WEEK = "week",
  THREE_MONTHS = "threemonths",
}

export type TTabForHeader = {
  value: EBookingView
  label: string
}

export type TSidebarCategory = {
  categoryName: string
  rooms: RoomDto[]
}
