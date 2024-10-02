import { OwnerDto } from "@/generated/owners"
import * as yup from "yup"

export const ShortClientSchema = yup.object<OwnerDto>().shape({
  firstName: yup.string(),
  lastname: yup.string(),
  mainPhone: yup.string(),
  middleName: yup.string(),
  optionalPhone: yup.string(),
  rating: yup.number(),
  })