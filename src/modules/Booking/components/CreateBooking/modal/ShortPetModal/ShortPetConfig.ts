import {
  DateField,
  InputTextField,
  SelectField,
} from "@/modules/Pets/components"
import { calcAge } from "@/modules/Pets/components/forms/utils/calcAge"
import { nanoid } from "nanoid"

type FormFieldShortPet = InputTextField | DateField | SelectField

export const ShortPetFieldsConfig: FormFieldShortPet[] = [
  {
    name: "type",
    id: nanoid(),
    type: "select",
    label: "Тип животного",
    required: true,
    options: [
      { value: "DOG", label: "Собака" },
      { value: "CAT", label: "Кошка" },
      { value: "EXOTIC", label: "Прочие" },
    ],
    validationErr: "Пожалуйста, заполните это поле",
    width: "full",
  },
  {
    name: "name",
    id: nanoid(),
    type: "text",
    label: "Кличка",
    required: true,
    validationErr: "Пожалуйста, заполните это поле",
    minLetters: 2,
    width: "full",
  },
  {
    name: "breed",
    id: nanoid(),
    type: "text",
    label: "Порода",
    required: true,
    validationErr: "Пожалуйста, заполните это поле",
    minLetters: 2,
    width: "full",
  },
  {
    name: "birthDate",
    id: nanoid(),
    type: "date",
    isPast: true,
    label: "Дата рождения",
    required: true,
    validationErr: "Пожалуйста, заполните это поле",
    width: "1/3",
  },
  {
    name: "age",
    id: nanoid(),
    type: "text",
    label: "Возраст",
    required: false,
    validationErr: "Укажите дату рождения",
    width: "1/3",
    valueFn: (data: { [key: string]: string }) => calcAge(data.birthDate),
  },
  {
    name: "sex",
    id: nanoid(),
    type: "select",
    options: [
      { value: "MALE", label: "М" },
      { value: "FEMALE", label: "Ж" },
      { value: "HERMAPHRODITE", label: "Другое" },
    ],
    label: "Пол",
    required: true,
    width: "1/3",
  },
]
