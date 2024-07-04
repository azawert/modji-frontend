/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * PetHotel: Categories Specification
 * Документация раздела по работе с категориями номеров
 * OpenAPI spec version: v1
 */
import * as axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
export interface UpdateCategoryDto {
  /**
   * Описание категории
   * @maxLength 250
   */
  description?: string;
  /**
   * Название категории. В случае наличия поля - не должно быть пустым. Допускаются буквы, цифры, спецсимволы.
   * @minLength 1
   * @maxLength 20
   */
  name?: string;
}

export interface NewCategoryDto {
  /**
   * Описание категории
   * @maxLength 250
   */
  description?: string;
  /**
   * Название категории. Не должно быть пустым. Допускаются буквы, цифры, спецсимволы.
   * @minLength 1
   * @maxLength 20
   */
  name: string;
}

export interface CategoryDto {
  /**
   * Описание категории
   * @maxLength 250
   */
  description?: string;
  /** ID категории */
  id: number;
  /**
   * Название категории
   * @minLength 1
   * @maxLength 20
   */
  name: string;
}

export type ErrorHttpStatus = typeof ErrorHttpStatus[keyof typeof ErrorHttpStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ErrorHttpStatus = {
  '100_CONTINUE': '100 CONTINUE',
  '101_SWITCHING_PROTOCOLS': '101 SWITCHING_PROTOCOLS',
  '102_PROCESSING': '102 PROCESSING',
  '103_EARLY_HINTS': '103 EARLY_HINTS',
  '103_CHECKPOINT': '103 CHECKPOINT',
  '200_OK': '200 OK',
  '201_CREATED': '201 CREATED',
  '202_ACCEPTED': '202 ACCEPTED',
  '203_NON_AUTHORITATIVE_INFORMATION': '203 NON_AUTHORITATIVE_INFORMATION',
  '204_NO_CONTENT': '204 NO_CONTENT',
  '205_RESET_CONTENT': '205 RESET_CONTENT',
  '206_PARTIAL_CONTENT': '206 PARTIAL_CONTENT',
  '207_MULTI_STATUS': '207 MULTI_STATUS',
  '208_ALREADY_REPORTED': '208 ALREADY_REPORTED',
  '226_IM_USED': '226 IM_USED',
  '300_MULTIPLE_CHOICES': '300 MULTIPLE_CHOICES',
  '301_MOVED_PERMANENTLY': '301 MOVED_PERMANENTLY',
  '302_FOUND': '302 FOUND',
  '302_MOVED_TEMPORARILY': '302 MOVED_TEMPORARILY',
  '303_SEE_OTHER': '303 SEE_OTHER',
  '304_NOT_MODIFIED': '304 NOT_MODIFIED',
  '305_USE_PROXY': '305 USE_PROXY',
  '307_TEMPORARY_REDIRECT': '307 TEMPORARY_REDIRECT',
  '308_PERMANENT_REDIRECT': '308 PERMANENT_REDIRECT',
  '400_BAD_REQUEST': '400 BAD_REQUEST',
  '401_UNAUTHORIZED': '401 UNAUTHORIZED',
  '402_PAYMENT_REQUIRED': '402 PAYMENT_REQUIRED',
  '403_FORBIDDEN': '403 FORBIDDEN',
  '404_NOT_FOUND': '404 NOT_FOUND',
  '405_METHOD_NOT_ALLOWED': '405 METHOD_NOT_ALLOWED',
  '406_NOT_ACCEPTABLE': '406 NOT_ACCEPTABLE',
  '407_PROXY_AUTHENTICATION_REQUIRED': '407 PROXY_AUTHENTICATION_REQUIRED',
  '408_REQUEST_TIMEOUT': '408 REQUEST_TIMEOUT',
  '409_CONFLICT': '409 CONFLICT',
  '410_GONE': '410 GONE',
  '411_LENGTH_REQUIRED': '411 LENGTH_REQUIRED',
  '412_PRECONDITION_FAILED': '412 PRECONDITION_FAILED',
  '413_PAYLOAD_TOO_LARGE': '413 PAYLOAD_TOO_LARGE',
  '413_REQUEST_ENTITY_TOO_LARGE': '413 REQUEST_ENTITY_TOO_LARGE',
  '414_URI_TOO_LONG': '414 URI_TOO_LONG',
  '414_REQUEST_URI_TOO_LONG': '414 REQUEST_URI_TOO_LONG',
  '415_UNSUPPORTED_MEDIA_TYPE': '415 UNSUPPORTED_MEDIA_TYPE',
  '416_REQUESTED_RANGE_NOT_SATISFIABLE': '416 REQUESTED_RANGE_NOT_SATISFIABLE',
  '417_EXPECTATION_FAILED': '417 EXPECTATION_FAILED',
  '418_I_AM_A_TEAPOT': '418 I_AM_A_TEAPOT',
  '419_INSUFFICIENT_SPACE_ON_RESOURCE': '419 INSUFFICIENT_SPACE_ON_RESOURCE',
  '420_METHOD_FAILURE': '420 METHOD_FAILURE',
  '421_DESTINATION_LOCKED': '421 DESTINATION_LOCKED',
  '422_UNPROCESSABLE_ENTITY': '422 UNPROCESSABLE_ENTITY',
  '423_LOCKED': '423 LOCKED',
  '424_FAILED_DEPENDENCY': '424 FAILED_DEPENDENCY',
  '425_TOO_EARLY': '425 TOO_EARLY',
  '426_UPGRADE_REQUIRED': '426 UPGRADE_REQUIRED',
  '428_PRECONDITION_REQUIRED': '428 PRECONDITION_REQUIRED',
  '429_TOO_MANY_REQUESTS': '429 TOO_MANY_REQUESTS',
  '431_REQUEST_HEADER_FIELDS_TOO_LARGE': '431 REQUEST_HEADER_FIELDS_TOO_LARGE',
  '451_UNAVAILABLE_FOR_LEGAL_REASONS': '451 UNAVAILABLE_FOR_LEGAL_REASONS',
  '500_INTERNAL_SERVER_ERROR': '500 INTERNAL_SERVER_ERROR',
  '501_NOT_IMPLEMENTED': '501 NOT_IMPLEMENTED',
  '502_BAD_GATEWAY': '502 BAD_GATEWAY',
  '503_SERVICE_UNAVAILABLE': '503 SERVICE_UNAVAILABLE',
  '504_GATEWAY_TIMEOUT': '504 GATEWAY_TIMEOUT',
  '505_HTTP_VERSION_NOT_SUPPORTED': '505 HTTP_VERSION_NOT_SUPPORTED',
  '506_VARIANT_ALSO_NEGOTIATES': '506 VARIANT_ALSO_NEGOTIATES',
  '507_INSUFFICIENT_STORAGE': '507 INSUFFICIENT_STORAGE',
  '508_LOOP_DETECTED': '508 LOOP_DETECTED',
  '509_BANDWIDTH_LIMIT_EXCEEDED': '509 BANDWIDTH_LIMIT_EXCEEDED',
  '510_NOT_EXTENDED': '510 NOT_EXTENDED',
  '511_NETWORK_AUTHENTICATION_REQUIRED': '511 NETWORK_AUTHENTICATION_REQUIRED',
} as const;

export interface Error {
  errors?: string[];
  httpStatus?: ErrorHttpStatus;
  message?: string;
  reason?: string;
  timeStamp?: string;
}





  /**
 * Получение списка всех категорий номеров. Доступно только для пользователей с ролью BOSS или ADMIN.
 * @summary Получить список всех категорий номеров
 */
export const getAllCategories = <TData = AxiosResponse<CategoryDto[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `https://rodionov.ru.fvds.ru:443/categories`,options
    );
  }

/**
 * Добавление новой категории номеров. Доступно только пользователям BOSS и ADMIN.
 * @summary Добавить новую категорию номеров
 */
export const addCategory = <TData = AxiosResponse<CategoryDto>>(
    newCategoryDto: NewCategoryDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.post(
      `https://rodionov.ru.fvds.ru:443/categories`,
      newCategoryDto,options
    );
  }

/**
 * Получение категории номеров по ID. Доступно только пользователям BOSS и ADMIN.
 * @summary Получить информацию о категории номеров
 */
export const getCategoryById = <TData = AxiosResponse<CategoryDto>>(
    id: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.get(
      `https://rodionov.ru.fvds.ru:443/categories/${id}`,options
    );
  }

/**
 * Удаление существующей категории номеров. Доступно только пользователям BOSS и ADMIN.
 * @summary Удалить информацию о категории номеров (безвозвратно)
 */
export const deleteCategoryById = <TData = AxiosResponse<void>>(
    id: number, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.delete(
      `https://rodionov.ru.fvds.ru:443/categories/${id}`,options
    );
  }

/**
 * Редактирование существующей категории номеров. Доступно пользователям BOSS и ADMIN.
 * @summary Изменить информацию об имеющейся категории номеров
 */
export const updateCategoryById = <TData = AxiosResponse<CategoryDto>>(
    id: number,
    updateCategoryDto: UpdateCategoryDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.default.patch(
      `https://rodionov.ru.fvds.ru:443/categories/${id}`,
      updateCategoryDto,options
    );
  }

export type GetAllCategoriesResult = AxiosResponse<CategoryDto[]>
export type AddCategoryResult = AxiosResponse<CategoryDto>
export type GetCategoryByIdResult = AxiosResponse<CategoryDto>
export type DeleteCategoryByIdResult = AxiosResponse<void>
export type UpdateCategoryByIdResult = AxiosResponse<CategoryDto>
