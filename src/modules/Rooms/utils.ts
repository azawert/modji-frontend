import { NewRoomDto, UpdateRoomDto } from "@/generated/room"
import { TRoomCreateForm } from "./pages/RoomsPage"

export const mapperFormToAnCreateRequest = (
  form: TRoomCreateForm
): NewRoomDto => {
  return {
    categoryId: +form.category,
    number: form.number,
    area: floatStringToFloatNumber(form.area.toString()),
    isVisible: true,
    description: form.description,
  }
}

export const mapperFormToAnUpdateRequest = (
  form: TRoomCreateForm
): UpdateRoomDto => {
  return {
    categoryId: +form.category,
    number: form.number,
    area: floatStringToFloatNumber(form.area.toString()),
    description: form.description,
  }
}

/**
 * Функция, которая будет менять строку на число с плавающей запятой (необходимо для запроса на сервер)
 * @param string строка которую необходимо переконвертировать в число
 * @returns число с плавающей запятой
 */
function floatStringToFloatNumber(string: string): number {
  let mappedNumber
  if (string.includes(",")) {
    mappedNumber = parseFloat(string.replace(",", "."))
  } else {
    mappedNumber = parseFloat(string)
  }

  return mappedNumber
}
