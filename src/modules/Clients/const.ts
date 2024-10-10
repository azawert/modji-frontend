import { NewOwnerDto, PetDtoForOwner } from "@/generated/owners"
import { TStep } from "@/shared/types/types"
import { SelectData } from "@/shared/ui/Select.tsx"
import { PetDtoType } from "@/generated/pets.ts"
import { Pet } from "./types"

/** набор шагов для модалки создания клиента */
export const steps: TStep<NewOwnerDto>[] = [
  {
    title: "Шаг 1: Основная информация",
    fields: [
      {
        label: "Фамилия",
        name: "lastName",
        validation: {
          minLength: {
            message: "Введите больше 2-ух символов",
            value: 2,
          },
          maxLength: {
            value: 30,
            message: "Введите меньше 30 символов",
          },
        },
      },
      {
        label: "Имя",
        name: "firstName",
        validation: {
          required: {
            message: "Пожалуйста, заполните это поле",
            value: true,
          },
          minLength: {
            message: "Введите больше 2-ух символов",
            value: 2,
          },
          maxLength: {
            value: 30,
            message: "Введите меньше 30 символов",
          },
        },
        isRequired: true,
      },
      {
        label: "Отчество",
        name: "middleName",
        validation: {
          minLength: {
            message: "Введите больше 2-ух символов",
            value: 2,
          },
          maxLength: {
            value: 30,
            message: "Введите меньше 30 символов",
          },
        },
      },
      {
        label: "Рейтинг",
        name: "rating",
        validation: {
          pattern: {
            value: /^(10|[1-9])$/,
            message: "Пожалуйста, используйте в этом поле цифры от 1 до 10",
          },
        },
      },
    ],
  },
  {
    title: "Шаг 2: Контакты",
    fields: [
      {
        label: "Основной телефон",
        isRequired: true,
        name: "mainPhone",
        validation: {
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
        },
        placeholder: "Основной телефон",
        isPhoneField: true,
      },
      {
        label: "Второй телефон",
        name: "optionalPhone",
        placeholder: "Второй телефон",
        validation: {},
        isPhoneField: true,
      },
      {
        label: "Прочие контакты",
        name: "otherContacts",
        placeholder: "Прочие контакты",
        validation: {},
      },
    ],
  },
  {
    title: "Шаг 3: Дополнительная информация",
    fields: [
      {
        name: "actualAddress",
        label: "Фактический адрес",
        placeholder: "Фактический адрес",
        validation: {},
      },
      {
        name: "trustedMan",
        label: "Доверенное лицо",
        placeholder: "Доверенное лицо",
        validation: {},
      },
      {
        name: "source",
        label: "Откуда узнал о гостинице",
        placeholder: "Откуда узнал о гостинице",
        validation: {},
      },
    ],
  },
]

export const NEW_PET_SELECT_DATA: SelectData[] = [
  {
    label: "Собака",
    value: PetDtoType.DOG,
  },
  {
    label: "Кот",
    value: PetDtoType.CAT,
  },
  {
    label: "Прочие",
    value: PetDtoType.EXOTIC,
  },
]

/** Функция которая мапит дто питомца в представление на форме клиента
 * @param pet питомец
 * @returns возвращает объект представления на форме клиента
 */
export const mapPetDtoToAnFormView = (pet: PetDtoForOwner): Pet => ({
  breed: pet.breed ?? "",
  petName: pet.name ?? "",
  petType: pet.type as PetDtoType,
})
