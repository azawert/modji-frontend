import { OwnerDto } from "@/generated/owners"
import { ClientData } from "./components/ClientsPage/TableWithClients.tsx"
import {
  convertServerDataToClientData,
  formatServerPhoneNumberToForm,
} from "@/shared/utils/utils"
import {
  IClientDataForCard,
  TMapperValuePetType,
} from "@/modules/Clients/types.ts"
import { getFullName } from "@/modules/Employee/utils.ts"
import { mapPetDtoToAnFormView } from "./const.ts"
import { PetDtoType } from "@/generated/pets.ts"

export const mapResponseToTableView = (data: OwnerDto[]): ClientData[] => {
  return data.map(owner => ({
    pets: owner.petsDto?.map(mapPetDtoToAnFormView) ?? [],
    client: {
      fullName: getFullName(
        owner.firstName || "",
        owner.lastName,
        owner.middleName
      ),
      ...(owner.mainPhone && {
        mainPhone: formatServerPhoneNumberToForm(owner.mainPhone),
      }),
      ...(owner.optionalPhone && {
        optionalPhone: formatServerPhoneNumberToForm(owner.optionalPhone),
      }),
      registrationDate: convertServerDataToClientData(owner.registrationDate!),
      id: owner.id?.toString() || "",
    },
  }))
}

export const mapDataFromServerToAnFormView = (
  data: OwnerDto
): IClientDataForCard => ({
  fromWhere: data.source,
  lastName: data.lastName,
  middleName: data.middleName,
  firstName: data.firstName || "",
  additionalComment: data.comment,
  registrationDate: data.registrationDate,
  realAddress: data.actualAddress,
  otherContacts: data.otherContacts,
  ...(data.optionalPhone && {
    secondaryPhone: formatServerPhoneNumberToForm(data.optionalPhone),
  }),
  confidant: data.trustedMan,
  ...(data.mainPhone && {
    mainPhone: formatServerPhoneNumberToForm(data.mainPhone),
  }),
  rating: data.rating?.toString(),
})

export const mapperForValuePetTypeToAnLabel: TMapperValuePetType = {
  [PetDtoType.CAT]: "Кот",
  [PetDtoType.DOG]: "Собака",
  [PetDtoType.EXOTIC]: "Экзот",
}
