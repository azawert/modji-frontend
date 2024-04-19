import { NewRoomDto, UpdateRoomDto } from "@/generated/room"
import { TRoomCreateForm } from "./pages/RoomsPage"

export const mapperFormToAnCreateRequest = (
  form: TRoomCreateForm
): NewRoomDto => ({
  categoryId: +form.category,
  number: form.number,
  area: +form.area,
  isVisible: true,
  description: form.description,
})

export const mapperFormToAnUpdateRequest = (
  form: TRoomCreateForm
): UpdateRoomDto => ({
  categoryId: +form.category,
  number: form.number,
  area: +form.area,
  description: form.description,
})
