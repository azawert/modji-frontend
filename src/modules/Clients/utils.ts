import { OwnerDto } from "@/generated/owners"
import { ClientData } from "./components/ClientsPage/TableWithClients.tsx"
import { convertServerDataToClientData } from "@/shared/utils/utils"
import { IClientDataForCard } from "@/modules/Clients/types.ts"
import { getFullName } from "@/modules/Employee/utils.ts"

export const mapResponseToTableView = (data: OwnerDto[]): ClientData[] => {
  return data.map(owner => ({
    pets: [],
    client: {
      fullName: getFullName(
        owner.firstName || "",
        owner.lastName,
        owner.middleName
      ),
      mainPhone: owner.mainPhone,
      optionalPhone: owner.optionalPhone,
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
  secondaryPhone: data.optionalPhone,
  confidant: data.trustedMan,
  mainPhone: data.mainPhone || "",
  rating: data.rating?.toString(),
})
