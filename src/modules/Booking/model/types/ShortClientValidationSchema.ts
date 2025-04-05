import * as yup from "yup"

import { NewOwnerDto } from "@/generated/owners"

export type ShortClientForm = Partial<NewOwnerDto> & {
  lastName: string
  firstName: string
  mainPhone: string
}

export const ShortClientSchema = yup.object<ShortClientForm>().shape({
  firstName: yup.string().required("Пожалуйста, введите имя"),
  lastName: yup.string().required("Пожалуйста, введите фамилию"),
  mainPhone: yup.string().required("Пожалуйста, введите номер телефона"),
  optionalPhone: yup.string(),
  middleName: yup.string(),
  rating: yup.number(),
})
