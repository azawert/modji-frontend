import { OwnerDto } from "@/generated/owners"
import { ClientData } from "./components/TableWithClients"
import { convertServerDataToClientData } from "@/shared/utils/utils"

export const getFullName = (
  firstName: string,
  lastname?: string,
  middleName?: string
): string => {
  if (!middleName && !lastname) {
    return `${firstName}`
  }
  if (!middleName) {
    return `${lastname} ${firstName}`
  }
  if (!lastname) {
    return `${firstName} ${middleName}`
  }
  return `${lastname} ${firstName} ${middleName}`
}

export const mapResponseToTableView = (data: OwnerDto[]): ClientData[] => {
  return data.map(owner => ({
    pets: [],
    client: {
      fullName: getFullName(owner.firstname!, owner.lastname, owner.middleName),
      mainPhone: owner.mainPhone,
      optionalPhone: owner.optionalPhone,
      registrationDate: convertServerDataToClientData(owner.registrationDate!),
    },
  }))
}
