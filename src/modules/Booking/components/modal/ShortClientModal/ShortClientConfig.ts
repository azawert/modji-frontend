import { ShortClientForm } from "@/modules/Booking/consts/Placeholders"

export const ShortClientFieldsConfig = [
  {
    id: "lastname",
    label: ShortClientForm.LAST_NAME.valueOf(),
    placeholder: ShortClientForm.LAST_NAME.valueOf(),
    error: "Пожалуйста, введите фамилию",
    required: false,
  },
  {
    id: "firstName",
    label: ShortClientForm.FIRST_NAME.valueOf(),
    placeholder: ShortClientForm.FIRST_NAME.valueOf(),
    error: "Пожалуйста, введите имя",
    required: true,
  },
  {
    id: "middleName",
    label: ShortClientForm.MIDDLE_NAME.valueOf(),
    placeholder: ShortClientForm.MIDDLE_NAME.valueOf(),
    error: "Пожалуйста, введите отчество",
    required: false,
  },
  {
    id: "mainPhone",
    label: ShortClientForm.MAIN_PHONE.valueOf(),
    placeholder: ShortClientForm.MAIN_PHONE.valueOf(),
    error: "Пожалуйста, введите номер телефона",
    required: false,
  },
  {
    id: "optionalPhone",
    label: ShortClientForm.OPTIONAL_PHONE.valueOf(),
    placeholder: ShortClientForm.OPTIONAL_PHONE.valueOf(),
    error: "Пожалуйста, введите номер телефона",
    required: false,
  },
  {
    id: "rating",
    label: ShortClientForm.RATING.valueOf(),
    placeholder: ShortClientForm.RATING.valueOf(),
    error: "Пожалуйста, введите рейтинг",
    required: false,
  },
]
