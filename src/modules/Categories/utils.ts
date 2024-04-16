import { NewCategoryDto, UpdateCategoryDto } from "@/generated/categories"
import { TCategoryForm } from "./const"

/**Маппер который конвертирует поля с формы в поля для отправки на бекенд для запроса создания */
export const mapperCategoryFormToAnCreateRequest = (
  data: TCategoryForm
): NewCategoryDto => ({
  name: data.name,
  description: data.description,
})

/**Маппер который конвертирует поля с формы в поля для отправки на бекенд для запроса редактирования */
export const mapperCategoryFromToAnUpdateRequest = (
  data: TCategoryForm
): UpdateCategoryDto => ({
  description: data.description,
  name: data.name,
})
