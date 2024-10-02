const BAD_REQUEST_ERROR = 'Ошибка 400: Запрос составлен неверно.';
const FORBIDDEN_ERROR = 'Ошибка 403: Недостаточно прав для совершения действия.';
const NOT_FOUND_ERROR = 'Ошибка 404: Объект не найден.';
const CONFLICT_ERROR = 'Ошибка 409: Ошибка уникальности полей базы данных.';
const INTERNAL_SERVER_ERROR = 'Ошибка 500: Внутренняя ошибка сервера.';

export const ERROR_MESSAGES: Record<string, string> = {
  '400': BAD_REQUEST_ERROR,
  '403': FORBIDDEN_ERROR,
  '404': NOT_FOUND_ERROR,
  '409': CONFLICT_ERROR,
  '500': INTERNAL_SERVER_ERROR,
};