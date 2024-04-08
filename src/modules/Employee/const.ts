import { NewUserDtoRole, UserDtoRole } from "@/generated/user"
import { SelectData } from "@/shared/ui/Select"

/** Тип для формы создания / редактирования пользователя
 * @prop email почта пользователя от 6 символов до 254
 * @prop firstName имя пользователя от 1 символа до 15
 * @prop lastName фамилия от 1 до 30
 * @prop password пароль пользователя
 * @prop confirmPassword подтверждения пароля на форме
 * @prop role роль пользователя
 * @prop isActive активный ли пользователь (при создании default true)
 * @prop middleName отчество от 1 до 30
 */
export type TCreateUser = {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  role: NewUserDtoRole
  isActive?: boolean
  middleName?: string
}

export const DEFAULT_VALUES_FOR_CREATE_USER_FORM: TCreateUser = {
  email: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  password: "",
  role: NewUserDtoRole.ROLE_USER,
  isActive: true,
  middleName: "",
}

export const EMAIL_VALIDATION_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const ROLE_SELECT_DATA: SelectData[] = [
  { label: "Администратор", value: UserDtoRole.ROLE_ADMIN },
  { label: "Финансист", value: UserDtoRole.ROLE_FINANCIAL },
  { label: "Зооняня", value: UserDtoRole.ROLE_USER },
]
