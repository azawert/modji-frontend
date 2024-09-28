/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * PetHotel: Users Specification
 * Документация раздела по работе с пользователями
 * OpenAPI spec version: v1
 */
import { axiosInstance } from "../lib/axios-instance"
import type { BodyType } from "../lib/axios-instance"
export type SetUserStateParams = {
  /**
   * Состояние, которое должно быть присвоено пользователю. isActive=true - учётная запись активна, isActive=false - учётная запись заблокирована.
   */
  isActive: boolean
}

export type GetAllUsersParams = {
  /**
   * Состояние учётной записи 1. isActive=true - вернуть все активные учётные записи, 2. isActive=false - вернуть все заблокированные учётные записи, 3. isActive=null (или опущен) - вернуть всех пользователей независимо от статуса.
   */
  isActive?: boolean
}

/**
 * Роль (определяет уровень доступа)
 */
export type UpdateUserDtoRole =
  (typeof UpdateUserDtoRole)[keyof typeof UpdateUserDtoRole]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateUserDtoRole = {
  ROLE_BOSS: "ROLE_BOSS",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_USER: "ROLE_USER",
  ROLE_FINANCIAL: "ROLE_FINANCIAL",
} as const

export interface UpdateUserDto {
  /**
   * Электронная почта
   * @minLength 6
   * @maxLength 254
   */
  email?: string
  /**
   * Имя пользователя
   * @minLength 2
   * @maxLength 15
   */
  firstName?: string
  /**
   * Фамилия пользователя
   * @minLength 2
   * @maxLength 30
   */
  lastName?: string
  /**
   * Отчество пользователя
   * @minLength 2
   * @maxLength 15
   */
  middleName?: string
  /**
   * Пароль для входа в учётную запись
   * @minLength 5
   * @maxLength 10
   */
  password?: string
  /** Роль (определяет уровень доступа) */
  role?: UpdateUserDtoRole
}

/**
 * Роль (определяет уровень доступа)
 */
export type NewUserDtoRole =
  (typeof NewUserDtoRole)[keyof typeof NewUserDtoRole]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NewUserDtoRole = {
  ROLE_BOSS: "ROLE_BOSS",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_USER: "ROLE_USER",
  ROLE_FINANCIAL: "ROLE_FINANCIAL",
} as const

export interface NewUserDto {
  /**
   * Электронная почта
   * @minLength 6
   * @maxLength 254
   */
  email: string
  /**
   * Имя пользователя
   * @minLength 2
   * @maxLength 15
   */
  firstName: string
  /** Состояние учётной записи (активна/заблокирована) */
  isActive?: boolean
  /**
   * Фамилия пользователя
   * @minLength 2
   * @maxLength 30
   */
  lastName?: string
  /**
   * Отчество пользователя
   * @minLength 2
   * @maxLength 15
   */
  middleName?: string
  /**
   * Пароль для входа в учётную запись
   * @minLength 5
   * @maxLength 10
   */
  password?: string
  /** Роль (определяет уровень доступа) */
  role: NewUserDtoRole
}

/**
 * Роль (определяет уровень доступа)
 */
export type UserDtoRole = (typeof UserDtoRole)[keyof typeof UserDtoRole]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserDtoRole = {
  ROLE_BOSS: "ROLE_BOSS",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_USER: "ROLE_USER",
  ROLE_FINANCIAL: "ROLE_FINANCIAL",
} as const

export interface UserDto {
  /**
   * Электронная почта
   * @minLength 6
   * @maxLength 254
   */
  email: string
  /**
   * Имя пользователя
   * @minLength 2
   * @maxLength 15
   */
  firstName: string
  id?: number
  /** Состояние учётной записи (активна/заблокирована) */
  isActive: boolean
  /**
   * Фамилия пользователя
   * @minLength 2
   * @maxLength 30
   */
  lastName?: string
  /**
   * Отчество пользователя
   * @minLength 2
   * @maxLength 15
   */
  middleName?: string
  /**
   * Пароль для входа в учётную запись
   * @minLength 5
   * @maxLength 10
   */
  password?: string
  /** Роль (определяет уровень доступа) */
  role: UserDtoRole
}

export type ErrorHttpStatus =
  (typeof ErrorHttpStatus)[keyof typeof ErrorHttpStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ErrorHttpStatus = {
  "100_CONTINUE": "100 CONTINUE",
  "101_SWITCHING_PROTOCOLS": "101 SWITCHING_PROTOCOLS",
  "102_PROCESSING": "102 PROCESSING",
  "103_EARLY_HINTS": "103 EARLY_HINTS",
  "103_CHECKPOINT": "103 CHECKPOINT",
  "200_OK": "200 OK",
  "201_CREATED": "201 CREATED",
  "202_ACCEPTED": "202 ACCEPTED",
  "203_NON_AUTHORITATIVE_INFORMATION": "203 NON_AUTHORITATIVE_INFORMATION",
  "204_NO_CONTENT": "204 NO_CONTENT",
  "205_RESET_CONTENT": "205 RESET_CONTENT",
  "206_PARTIAL_CONTENT": "206 PARTIAL_CONTENT",
  "207_MULTI_STATUS": "207 MULTI_STATUS",
  "208_ALREADY_REPORTED": "208 ALREADY_REPORTED",
  "226_IM_USED": "226 IM_USED",
  "300_MULTIPLE_CHOICES": "300 MULTIPLE_CHOICES",
  "301_MOVED_PERMANENTLY": "301 MOVED_PERMANENTLY",
  "302_FOUND": "302 FOUND",
  "302_MOVED_TEMPORARILY": "302 MOVED_TEMPORARILY",
  "303_SEE_OTHER": "303 SEE_OTHER",
  "304_NOT_MODIFIED": "304 NOT_MODIFIED",
  "305_USE_PROXY": "305 USE_PROXY",
  "307_TEMPORARY_REDIRECT": "307 TEMPORARY_REDIRECT",
  "308_PERMANENT_REDIRECT": "308 PERMANENT_REDIRECT",
  "400_BAD_REQUEST": "400 BAD_REQUEST",
  "401_UNAUTHORIZED": "401 UNAUTHORIZED",
  "402_PAYMENT_REQUIRED": "402 PAYMENT_REQUIRED",
  "403_FORBIDDEN": "403 FORBIDDEN",
  "404_NOT_FOUND": "404 NOT_FOUND",
  "405_METHOD_NOT_ALLOWED": "405 METHOD_NOT_ALLOWED",
  "406_NOT_ACCEPTABLE": "406 NOT_ACCEPTABLE",
  "407_PROXY_AUTHENTICATION_REQUIRED": "407 PROXY_AUTHENTICATION_REQUIRED",
  "408_REQUEST_TIMEOUT": "408 REQUEST_TIMEOUT",
  "409_CONFLICT": "409 CONFLICT",
  "410_GONE": "410 GONE",
  "411_LENGTH_REQUIRED": "411 LENGTH_REQUIRED",
  "412_PRECONDITION_FAILED": "412 PRECONDITION_FAILED",
  "413_PAYLOAD_TOO_LARGE": "413 PAYLOAD_TOO_LARGE",
  "413_REQUEST_ENTITY_TOO_LARGE": "413 REQUEST_ENTITY_TOO_LARGE",
  "414_URI_TOO_LONG": "414 URI_TOO_LONG",
  "414_REQUEST_URI_TOO_LONG": "414 REQUEST_URI_TOO_LONG",
  "415_UNSUPPORTED_MEDIA_TYPE": "415 UNSUPPORTED_MEDIA_TYPE",
  "416_REQUESTED_RANGE_NOT_SATISFIABLE": "416 REQUESTED_RANGE_NOT_SATISFIABLE",
  "417_EXPECTATION_FAILED": "417 EXPECTATION_FAILED",
  "418_I_AM_A_TEAPOT": "418 I_AM_A_TEAPOT",
  "419_INSUFFICIENT_SPACE_ON_RESOURCE": "419 INSUFFICIENT_SPACE_ON_RESOURCE",
  "420_METHOD_FAILURE": "420 METHOD_FAILURE",
  "421_DESTINATION_LOCKED": "421 DESTINATION_LOCKED",
  "422_UNPROCESSABLE_ENTITY": "422 UNPROCESSABLE_ENTITY",
  "423_LOCKED": "423 LOCKED",
  "424_FAILED_DEPENDENCY": "424 FAILED_DEPENDENCY",
  "425_TOO_EARLY": "425 TOO_EARLY",
  "426_UPGRADE_REQUIRED": "426 UPGRADE_REQUIRED",
  "428_PRECONDITION_REQUIRED": "428 PRECONDITION_REQUIRED",
  "429_TOO_MANY_REQUESTS": "429 TOO_MANY_REQUESTS",
  "431_REQUEST_HEADER_FIELDS_TOO_LARGE": "431 REQUEST_HEADER_FIELDS_TOO_LARGE",
  "451_UNAVAILABLE_FOR_LEGAL_REASONS": "451 UNAVAILABLE_FOR_LEGAL_REASONS",
  "500_INTERNAL_SERVER_ERROR": "500 INTERNAL_SERVER_ERROR",
  "501_NOT_IMPLEMENTED": "501 NOT_IMPLEMENTED",
  "502_BAD_GATEWAY": "502 BAD_GATEWAY",
  "503_SERVICE_UNAVAILABLE": "503 SERVICE_UNAVAILABLE",
  "504_GATEWAY_TIMEOUT": "504 GATEWAY_TIMEOUT",
  "505_HTTP_VERSION_NOT_SUPPORTED": "505 HTTP_VERSION_NOT_SUPPORTED",
  "506_VARIANT_ALSO_NEGOTIATES": "506 VARIANT_ALSO_NEGOTIATES",
  "507_INSUFFICIENT_STORAGE": "507 INSUFFICIENT_STORAGE",
  "508_LOOP_DETECTED": "508 LOOP_DETECTED",
  "509_BANDWIDTH_LIMIT_EXCEEDED": "509 BANDWIDTH_LIMIT_EXCEEDED",
  "510_NOT_EXTENDED": "510 NOT_EXTENDED",
  "511_NETWORK_AUTHENTICATION_REQUIRED": "511 NETWORK_AUTHENTICATION_REQUIRED",
} as const

export interface Error {
  errors?: string[]
  httpStatus?: ErrorHttpStatus
  message?: string
  reason?: string
  timeStamp?: string
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * Получение списка всех пользователей. Доступно только для пользователей с ролью BOSS или ADMIN.
 * @summary Получить список всех пользователей
 */
export const getAllUsers = (
  params?: GetAllUsersParams,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<UserDto[]>(
    { url: `/users`, method: "GET", params },
    options
  )
}

/**
 * Добавление нового пользователя.  Создание пользователей с ролью USER и FINANCIAL доступно только пользователям BOSS и ADMIN.  Пользователя ADMIN может создавать только BOSS.  Пользователя BOSS создать нельзя (его добавляют вручную разработчики).
 * @summary Добавить нового пользователя
 */
export const addUser = (
  userDto: BodyType<UserDto>,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<UserDto>(
    {
      url: `/users`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: userDto,
    },
    options
  )
}

/**
 * Получение пользователя по ID.  Информация о пользователях ADMIN, USER и FINANCIAL доступна только для пользователей с ролью BOSS или ADMIN.  Информацию о пользователе BOSS может просматривать только он сам.  Для пользователей USER и FINANCIAL доступна информация о самом себе.
 * @summary Получить информацию о пользователе
 */
export const getUserById = (
  id: number,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<UserDto>({ url: `/users/${id}`, method: "GET" }, options)
}

/**
 * Удаление существующего пользователя.  Удаление пользователей с ролью USER и FINANCIAL доступно только пользователям BOSS и ADMIN.  Пользователя ADMIN может удалить только BOSS.  Пользователя BOSS удалить нельзя (его удаляют вручную разработчики).
 * @summary Удалить информацию о пользователе (безвозвратно)
 */
export const deleteUserById = (
  id: number,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<void>({ url: `/users/${id}`, method: "DELETE" }, options)
}

/**
 * Редактирование существующего пользователя.  Каждый пользователь может редактировать сам себя (за исключением изменения своей роли).  Кроме того, редактирование пользователей с ролью USER и FINANCIAL доступно пользователям BOSS и ADMIN, а пользователя ADMIN может редактировать BOSS. Пользователи не могут установить роль равную своей или выше неё. Состояние учётной записи (isActive) редактируется другим эндпоинтом.
 * @summary Изменить информацию об имеющемся пользователе
 */
export const updateUser = (
  id: number,
  updateUserDto: BodyType<UpdateUserDto>,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<UserDto>(
    {
      url: `/users/${id}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: updateUserDto,
    },
    options
  )
}

/**
 * Редактирование состояния учётной записи пользователя - Активна / Заблокирована. Редактирование пользователей с ролью USER и FINANCIAL доступно пользователям BOSS и ADMIN, а пользователя ADMIN может редактировать только BOSS.
 * @summary Изменить состояние учётной записи пользователя - Активна / Заблокирована.
 */
export const setUserState = (
  id: number,
  params: SetUserStateParams,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<UserDto>(
    { url: `/users/${id}/state`, method: "PATCH", params },
    options
  )
}

export type GetAllUsersResult = NonNullable<
  Awaited<ReturnType<typeof getAllUsers>>
>
export type AddUserResult = NonNullable<Awaited<ReturnType<typeof addUser>>>
export type GetUserByIdResult = NonNullable<
  Awaited<ReturnType<typeof getUserById>>
>
export type DeleteUserByIdResult = NonNullable<
  Awaited<ReturnType<typeof deleteUserById>>
>
export type UpdateUserResult = NonNullable<
  Awaited<ReturnType<typeof updateUser>>
>
export type SetUserStateResult = NonNullable<
  Awaited<ReturnType<typeof setUserState>>
>
