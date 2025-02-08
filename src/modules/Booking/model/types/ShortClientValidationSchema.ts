import { OwnerDto } from "@/generated/owners"
import * as yup from "yup"

export const ShortClientSchema = yup.object<OwnerDto>().shape({
  firstName: yup.string().required("Пожалуйста, введите имя"),
  lastname: yup.string().required("Пожалуйста, введите фамилию"),
  mainPhone: yup.string().required("Пожалуйста, введите номер телефона"),
  optionalPhone: yup.string(),
  middleName: yup.string(),
  rating: yup.number(),
})
