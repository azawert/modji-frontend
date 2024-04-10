import { NewUserDtoRole, UserDto, UserDtoRole } from "@/generated/user"
import { TCreateUser } from "./const"

/**
 * Функция для получения полного имени сотрудника
 * @param firstName имя сотрудника
 * @param [lastName] фамилия сотрудника
 * @param [middleName] отчество
 */
export const getFullName = (
  firstName: string,
  lastName?: string,
  middleName?: string
): string => {
  if (!middleName && !lastName) {
    return `${firstName}`
  }
  if (!middleName) {
    return `${lastName} ${firstName}`
  }
  if (!lastName) {
    return `${firstName} ${middleName}`
  }
  return `${lastName} ${firstName} ${middleName}`
}

/** Маппер для приходящей должности с бека на русский язык для отображения на фронте */
export const roleMapperForRussianLanguage = {
  [UserDtoRole.ROLE_ADMIN]: "Администратор",
  [UserDtoRole.ROLE_BOSS]: "Управляющий",
  [UserDtoRole.ROLE_FINANCIAL]: "Финансист",
  [UserDtoRole.ROLE_USER]: "Зооняня",
}

/** Маппер для превращения модельки с формы в форму для запроса на бэк
 * @param data TCreateUser данные которые приходят с формы
 * @returns NewUserDto возвращает объект для отбравки на бэк
 */
export const mapperCreateUserFormToAnUserCreateRequest = (
  data: TCreateUser
): UserDto => ({
  email: data.email,
  role: data.role || NewUserDtoRole.ROLE_USER,
  firstName: data.firstName,
  isActive: true,
  lastName: data.lastName || undefined,
  middleName: data.middleName || undefined,
  password: data.password,
})

/** Маппер для превращения модельки с формы в форму для запроса на бэк
 * @param data TCreateUser данные которые приходят с формы
 * @param id number айди сущности
 * @returns NewUserDto возвращает объект для отбравки на бэк
 */
export const mapperCreateUserFormToAnUserUpdateRequest = (
  data: TCreateUser,
  id: number
): UserDto => ({
  email: data.email,
  role: data.role || NewUserDtoRole.ROLE_USER,
  firstName: data.firstName,
  isActive: true,
  lastName: data.lastName || undefined,
  middleName: data.middleName || undefined,
  password: data.password,
  id,
})
