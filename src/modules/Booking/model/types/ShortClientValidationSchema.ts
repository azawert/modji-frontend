import { OwnerDto } from "@/generated/owners"
import * as yup from "yup"

export const ShortClientSchema = yup.object<OwnerDto>().shape({
  firstName: yup
    .string()
    .length(2, "Поле должно содержать не менее 2 символов"),
  lastname: yup.string().length(2, "Поле должно содержать не менее 2 символов"),
  mainPhone: yup.string(),
  middleName: yup
    .string()
    .length(2, "Поле должно содержать не менее 2 символов"),
  optionalPhone: yup.string(),
  rating: yup.number(),
})
