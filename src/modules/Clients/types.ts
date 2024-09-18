import { PetDtoType } from "@/generated/pets"

/** Интерфейс для одного айтема в карточке */
export interface IInfoItem {
  title: string
  value?: string
}

/** Интерфейс для данных которые нужны в карточке клиента */
export interface IClientDataForCard {
  firstName: string
  mainPhone?: string
  lastName?: string
  middleName?: string
  secondaryPhone?: string
  otherContacts?: string
  realAddress?: string
  confidant?: string
  fromWhere?: string
  registrationDate?: string
  additionalComment?: string
  rating?: string
}

export interface IPropsForClientFullCard {
  clientInfo?: IClientDataForCard
  handleEditClientNavigate?: () => void
}

export interface Pet {
  petName: string
  petType: PetDtoType
  breed: string
}

/** Тип для отображения значения типа питомца на карточке питомца */
export type TMapperValuePetType = Record<PetDtoType, string>
