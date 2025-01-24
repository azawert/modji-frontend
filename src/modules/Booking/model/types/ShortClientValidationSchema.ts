import { OwnerDto } from "@/generated/owners"
import * as yup from "yup"

export const ShortClientSchema = yup.object<OwnerDto>().shape({
  firstName: yup.string().required("Пожалуйста, введите имя"),
  lastname: yup.string().required("Пожалуйста, введите фамилию"),
  mainPhone: yup
    .string()
    .required("Пожалуйста, введите номер телефона")
    .length(10, "Неверный формат номера телефона"),
  optionalPhone: yup
    .string()
    .min(10, "Неверный формат номера телефона")
    .max(12, "Неверный формат номера телефона"),
  middleName: yup.string(),
  rating: yup.number(),
})
