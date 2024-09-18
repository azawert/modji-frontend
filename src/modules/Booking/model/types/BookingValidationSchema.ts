import { PetDto } from "@/generated/bookings"
import { OwnerShortDto } from "@/generated/owners"
import * as yup from "yup"

export interface ICategoryAndRoom {
  categories: string
  rooms: string
}

export interface IScheduleForm {
  dateFrom: string
  dateTo: string
  timeFrom?: string
  timeTo?: string
  daysAmount?: number
}

export interface IOwnerForm {
  owner: OwnerShortDto
  pets: PetDto[]
}

export interface IPayment {
  pricePerDay: number
  prepayment: number
  isPrepaymentPaid?: boolean
  fullPrice?: number
}

export interface IComment {
  comment?: string
}

export interface IPet {
  petIds: number[]
}

export interface IBookingForm
  extends ICategoryAndRoom,
    IScheduleForm,
    IPayment,
    IComment,
    IPet {}

const isValidDate = (dateString: string) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/
  if (!regex.test(dateString)) return false

  const [day, month, year] = dateString.split(".").map(Number)
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

const isValidateNumericString = (value: number) => {
  return !isNaN(Number(value))
}

export const ScreenSchema1 = yup.object<IBookingForm>().shape({
  dateFrom: yup
    .string()
    .required("Пожалуйста заполните это поле")
    .test(
      "is-valid-date",
      "Неверный формат даты. Используйте DD.MM.YYYY",
      isValidDate
    ),
  dateTo: yup
    .string()
    .required("Пожалуйста заполните это поле")
    .test(
      "is-valid-date",
      "Неверный формат даты. Используйте DD.MM.YYYY",
      isValidDate
    ),
  timeFrom: yup.string(),
  timeTo: yup.string(),
  daysAmount: yup.number(),
})

export const ScreenSchema2 = yup.object<ICategoryAndRoom>().shape({
  categories: yup.string().required("Пожалуйста выберите категорию"),
  rooms: yup.string().required("Пожалуйста выберите комнату"),
})

export const ScreenSchema3 = ScreenSchema1.concat(ScreenSchema2)

export const ScreenSchema4 = yup.object<IBookingForm>().shape({
  pricePerDay: yup
    .number()
    .required("Введите стоимость за день")
    .test(
      "is-valid-numeric-string",
      "Неверный формат числа. Используйте только цифры",
      isValidateNumericString
    ),
  prepayment: yup
    .number()
    .required("Введите размер предоплаты")
    .test(
      "is-valid-numeric-string",
      "Неверный формат числа. Используйте только цифры",
      isValidateNumericString
    ),
  isPrepaymentPaid: yup.boolean(),
  fullPrice: yup.number(),
})

export const ScreenSchema5 = yup.object().shape({
  comment: yup.string(),
  petIds: yup.array().required(),
})

export const FullBookingSchema =
  ScreenSchema4.concat(ScreenSchema3).concat(ScreenSchema5)
