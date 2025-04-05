import * as yup from "yup"

import { PetDto } from "@/generated/bookings"

export const ShortPetSchema = yup.object<PetDto>().shape({
  type: yup.string().required("Выберите тип животного"),
  name: yup.string().required("Выберите кличку животного"),
  breed: yup.string().required("Выберите породу животного"),
  birthDate: yup.string().required("Выберите дату рождения"),
  sex: yup.string().required("Выберите пол животного"),
})
