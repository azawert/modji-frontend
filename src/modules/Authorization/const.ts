/**
 * Тип для формы  авторизации пользователя
 * email почта пользователя от 6 символов до 254
 * password пароль пользователя
 */
export type TAuthUser = {
  email: string
  password: string
}

export const EMAIL_VALIDATION_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
