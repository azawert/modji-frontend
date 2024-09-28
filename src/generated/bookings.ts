/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * PetHotel: Bookings Specification
 * Документация раздела по работе с бронированиями
 * OpenAPI spec version: v4
 */
import { axiosInstance } from "../lib/axios-instance"
import type { BodyType } from "../lib/axios-instance"
/**
 * Дата планируемого выезда в формате "dd.MM.yyyy". Должна быть равна или позже даты заезда.
 */
export type CheckOutDateParameter = string

/**
 * Дата планируемого заезда в формате "dd.MM.yyyy". Должна быть до или равна дате выезда.
 */
export type CheckInDateParameter = string

export type FindBlockingBookingsForRoomInDatesParams = {
  /**
   * Дата планируемого заезда в формате "dd.MM.yyyy". Должна быть до или равна дате выезда.
   */
  checkInDate: CheckInDateParameter
  /**
   * Дата планируемого выезда в формате "dd.MM.yyyy". Должна быть равна или позже даты заезда.
   */
  checkOutDate: CheckOutDateParameter
}

export type FindCrossingBookingsForRoomInDatesParams = {
  /**
   * Дата планируемого заезда в формате "dd.MM.yyyy". Должна быть до или равна дате выезда.
   */
  checkInDate: CheckInDateParameter
  /**
   * Дата планируемого выезда в формате "dd.MM.yyyy". Должна быть равна или позже даты заезда.
   */
  checkOutDate: CheckOutDateParameter
}

export type CheckUpdateBookingRoomAvailableInDatesParams = {
  /**
   * Дата планируемого заезда в формате "dd.MM.yyyy". Должна быть до или равна дате выезда.
   */
  checkInDate: CheckInDateParameter
  /**
   * Дата планируемого выезда в формате "dd.MM.yyyy". Должна быть равна или позже даты заезда.
   */
  checkOutDate: CheckOutDateParameter
}

export type CheckRoomAvailableInDatesParams = {
  /**
   * Дата планируемого заезда в формате "dd.MM.yyyy". Должна быть до или равна дате выезда.
   */
  checkInDate: CheckInDateParameter
  /**
   * Дата планируемого выезда в формате "dd.MM.yyyy". Должна быть равна или позже даты заезда.
   */
  checkOutDate: CheckOutDateParameter
}

/**
 * Краткое Дто клиента
 */
export interface OwnerShortDto {
  /**
   * ФИО хозяина питомца
   * @minLength 1
   * @maxLength 30
   */
  name?: string
  /** Рейтинг клиента (От 1 до 10) */
  rating?: number
}

/**
 * Тип животного
 */
export type PetDtoType = (typeof PetDtoType)[keyof typeof PetDtoType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PetDtoType = {
  DOG: "DOG",
  CAT: "CAT",
  EXOTIC: "EXOTIC",
} as const

/**
 * Пол питомца
 */
export type PetDtoSex = (typeof PetDtoSex)[keyof typeof PetDtoSex]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PetDtoSex = {
  FEMALE: "FEMALE",
  MALE: "MALE",
  HERMAPHRODITE: "HERMAPHRODITE",
} as const

export interface PetDto {
  /**
   * Дополнительные комментарии, особенности поведения
   * @maxLength 1000
   */
  additionalData?: string
  /** Возраст питомца, высчитывается автоматически на основании даты рождения */
  age?: string
  /** Есть ли аллергия? */
  allergy?: boolean
  /**
   * Если предыдущее поле true, тогда в этом поле описание на что аллергия
   * @maxLength 250
   */
  allergyType?: string
  /**
   * Вредные привычки
   * @maxLength 250
   */
  badHabit?: string
  /**
   * Лает / воет в одиночестве?
   * @maxLength 250
   */
  barkHowl?: string
  /** Дата рождения (в формате "dd.MM.yyyy"), должно быть в прошлом */
  birthDate?: string
  /**
   * Порода питомца
   * @minLength 1
   * @maxLength 30
   */
  breed?: string
  /** Есть ли у питомца хронические заболевания? */
  chronicDisease?: boolean
  /**
   * Если предыдущее поле true, тогда в этом поле описание какие хронические заболевания есть
   * @maxLength 500
   */
  chronicDiseaseType?: string
  /**
   * Окрас питомца
   * @maxLength 30
   */
  color?: string
  /**
   * Привычное время прогулок День
   * @maxLength 150
   */
  dayWalking?: string
  /**
   * Справляет ли  нужду дома?
   * @maxLength 250
   */
  defecateAtHome?: string
  /**
   * Привычное время прогулок Вечер
   * @maxLength 150
   */
  eveningWalking?: string
  /**
   * Состав корма/консерв
   * @maxLength 250
   */
  feedComposition?: string
  /**
   * Особенности кормления
   * @maxLength 500
   */
  feedingPractice?: string
  /** Количество кормлений в день (От 1 до 9) */
  feedingQuantity?: number
  /**
   * Норма на 1 кормление
   * @maxLength 250
   */
  feedingRate?: string
  /**
   * Название корма/консерв
   * @maxLength 250
   */
  feedName?: string
  /**
   * Вид корма (сухой / натуралка/консервы)
   * @maxLength 250
   */
  feedType?: string
  /**
   * Даты обработки от блох/клещей с указанием препарата
   * @maxLength 250
   */
  fleaMite?: string
  /**
   * Ворует ли еду со стола?
   * @maxLength 250
   */
  foodFromTable?: string
  /**
   * Портит ли вещи, мебель?
   * @maxLength 250
   */
  furnitureDamage?: string
  /**
   * Особенности состояния здоровья питомца (ФИП)
   * @maxLength 500
   */
  healthCharacteristic?: string
  /** Предполагаемая дата очередной течки (для сук)(в формате "dd.MM.yyyy"), должно быть в будущем */
  heatDate?: string
  /** id питомца */
  id?: number
  /** Ваша собака когда-нибудь кого-нибудь кусала? */
  isBitePeople?: boolean
  /** Прошел ли питомец курс послушания? */
  isDogTraining?: boolean
  /** Выставочная ли собака? */
  isExhibition?: boolean
  /** Необходимы ли лекарства, витамины? */
  isMedicine?: boolean
  /**
   * Что любит
   * @maxLength 500
   */
  like?: string
  /**
   * Метит дома?
   * @maxLength 250
   */
  markAtHome?: string
  /**
   * Если предыдущее поле true, тогда в этом поле название, режим приема лекарств/витаминов и доза
   * @maxLength 500
   */
  medicineRegimen?: string
  /**
   * Привычное время прогулок Утро
   * @maxLength 150
   */
  morningWalking?: string
  /**
   * Кличка питомца
   * @minLength 1
   * @maxLength 30
   */
  name?: string
  /**
   * Как относится к незнакомым людям?
   * @maxLength 500
   */
  newPeople?: string
  /**
   * Что не любит
   * @maxLength 500
   */
  notLike?: string
  owner?: OwnerShortDto
  /**
   * Дата обработки от глистов/паразитов
   * @maxLength 250
   */
  parasites?: string
  /**
   * Перенесенные заболевания
   * @maxLength 500
   */
  pastDisease?: string
  /**
   * Играет / гуляет с другими собаками?
   * @maxLength 500
   */
  playWithDogs?: string
  /**
   * Если предыдущее поле true, тогда в этом поле причина укуса
   * @maxLength 250
   */
  reasonOfBite?: string
  /** Пол питомца */
  sex?: PetDtoSex
  /**
   * Чип, Клеймо, Особые приметы
   * @maxLength 150
   */
  sign?: string
  /**
   * Требуется ли спец уход, какой?
   * @maxLength 500
   */
  specialCare?: string
  /**
   * Умеет ли питомец спокойно оставаться один?
   * @maxLength 250
   */
  stayAlone?: string
  /**
   * Есть ли опыт разлуки с хозяином?
   * @maxLength 500
   */
  stayWithoutMaster?: string
  /**
   * Перенесенные операции (кастрация)
   * @maxLength 250
   */
  surgery?: string
  /**
   * Любимые игрушки, игры питомца
   * @maxLength 500
   */
  toys?: string
  /**
   * Если предыдущее поле true, тогда в этом поле название курс послушания
   * @maxLength 500
   */
  trainingName?: string
  /**
   * Разрешенные лакомства и их количество
   * @maxLength 250
   */
  treat?: string
  /** Тип животного */
  type?: PetDtoType
  /**
   * Дата последней сдачи мочи
   * @maxLength 250
   */
  urineAnalysis?: string
  /**
   * Даты последних прививок, названия вакцин
   * @maxLength 250
   */
  vaccine?: string
  /**
   * Контакты ветврача, к которому следует обращаться в случае необходимости
   * @maxLength 500
   */
  vetData?: string
  /** Дата последнего посещения ветврача (в формате "dd.MM.yyyy"), должно быть в прошлом */
  vetVisitDate?: string
  /**
   * Причина последнего посещения врача
   * @maxLength 250
   */
  vetVisitReason?: string
  /**
   * Сколько раз в день питомец привык гулять?/гуляет ли на улице
   * @maxLength 250
   */
  walking?: string
}

export interface CategoryDto {
  /** ID категории */
  id: number
  /**
   * Название категории
   * @minLength 1
   * @maxLength 20
   */
  name: string
  /**
   * Описание категории
   * @maxLength 250
   */
  text?: string
}

export interface RoomDto {
  /**
   * Площадь номера
   * @minimum 0
   */
  area?: number
  Category?: CategoryDto
  /**
   * Описание номера
   * @maxLength 250
   */
  description?: string
  /** ID номера */
  id?: number
  /** Отображение номера в сетке бронирований */
  isVisible?: boolean
  /**
   * Буквенно-цифровое обозначение номера
   * @minLength 1
   * @maxLength 100
   */
  number: string
}

/**
 * Статус бронирования (Первичное, Подтвержденное, Заселен, Выселен, Отменено). По умолчанию для бронирования типа TYPE_BOOKING устанавливается статус STATUS_INITIAL. Если поле isPrepaid=true - статус STATUS_CONFIRMED. Для бронирования типа TYPE_CLOSING устанавливается статус STATUS_CONFIRMED. Остальные статусы присваиваются пользователем вручную.
 */
export type UpdateBookingDtoStatus =
  (typeof UpdateBookingDtoStatus)[keyof typeof UpdateBookingDtoStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateBookingDtoStatus = {
  STATUS_INITIAL: "STATUS_INITIAL",
  STATUS_CONFIRMED: "STATUS_CONFIRMED",
  STATUS_CHECKED_IN: "STATUS_CHECKED_IN",
  STATUS_CHECKED_OUT: "STATUS_CHECKED_OUT",
  STATUS_CANCELLED: "STATUS_CANCELLED",
} as const

/**
 * Причина закрытия номера. Обязательно для бронирования типа TYPE_CLOSING
 */
export type UpdateBookingDtoReasonOfStop =
  (typeof UpdateBookingDtoReasonOfStop)[keyof typeof UpdateBookingDtoReasonOfStop]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateBookingDtoReasonOfStop = {
  REASON_UNAVAILABLE: "REASON_UNAVAILABLE",
  REASON_RENOVATION: "REASON_RENOVATION",
  REASON_CLEANING: "REASON_CLEANING",
} as const

export interface UpdateBookingDto {
  /**
   * Стоимость за весь период бронирования.
   * @minimum 0
   * @maximum 9999999.99
   */
  amount?: number
  /** Дата заезда в формате "dd.MM.yyyy" */
  checkInDate?: string
  /** Время заезда в формате "HH:mm" */
  checkInTime?: string
  /** Дата выезда в формате "dd.MM.yyyy" */
  checkOutDate?: string
  /** Время выезда в формате "HH:mm" */
  checkOutTime?: string
  /**
   * Комментарий к бронированию
   * @maxLength 150
   */
  comment?: string
  /** Ссылка на файл-вложение */
  fileUrl?: string
  /** Внесена ли предоплата */
  isPrepaid?: boolean
  /** Список id питомцев в бронировании */
  petIds?: number[]
  /**
   * Сумма предоплаты.
   * @minimum 0
   * @maximum 999999.99
   */
  prepaymentAmount?: number
  /**
   * Цена за сутки.
   * @minimum 0
   * @maximum 999999.99
   */
  price?: number
  /**
   * Отмены бронирования.
   * @maxLength 150
   */
  reasonOfCancel?: string
  /** Причина закрытия номера. Обязательно для бронирования типа TYPE_CLOSING */
  reasonOfStop?: UpdateBookingDtoReasonOfStop
  /** Id бронируемого номера */
  roomId?: number
  /** Статус бронирования (Первичное, Подтвержденное, Заселен, Выселен, Отменено). По умолчанию для бронирования типа TYPE_BOOKING устанавливается статус STATUS_INITIAL. Если поле isPrepaid=true - статус STATUS_CONFIRMED. Для бронирования типа TYPE_CLOSING устанавливается статус STATUS_CONFIRMED. Остальные статусы присваиваются пользователем вручную. */
  status?: UpdateBookingDtoStatus
}

/**
 * Тип бронирования (обычное или временное закрытие номера, например, для ремонта)
 */
export type NewBookingDtoType =
  (typeof NewBookingDtoType)[keyof typeof NewBookingDtoType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NewBookingDtoType = {
  TYPE_BOOKING: "TYPE_BOOKING",
  TYPE_CLOSING: "TYPE_CLOSING",
} as const

/**
 * Причина закрытия номера. Обязательно для бронирования типа TYPE_CLOSING
 */
export type NewBookingDtoReasonOfStop =
  (typeof NewBookingDtoReasonOfStop)[keyof typeof NewBookingDtoReasonOfStop]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NewBookingDtoReasonOfStop = {
  REASON_UNAVAILABLE: "REASON_UNAVAILABLE",
  REASON_RENOVATION: "REASON_RENOVATION",
  REASON_CLEANING: "REASON_CLEANING",
} as const

export interface NewBookingDto {
  /**
   * Стоимость за весь период бронирования.
   * @minimum 0
   * @maximum 9999999.99
   */
  amount?: number
  /** Дата заезда в формате "dd.MM.yyyy" */
  checkInDate: string
  /** Время заезда в формате "HH:mm" */
  checkInTime?: string
  /** Дата выезда в формате "dd.MM.yyyy" */
  checkOutDate: string
  /** Время выезда в формате "HH:mm" */
  checkOutTime?: string
  /**
   * Комментарий к бронированию
   * @maxLength 150
   */
  comment?: string
  /** Ссылка на файл-вложение */
  fileUrl?: string
  /** Внесена ли предоплата */
  isPrepaid?: boolean
  /** Список id питомцев в бронировании */
  petIds?: number[]
  /**
   * Сумма предоплаты.
   * @minimum 0
   * @maximum 999999.99
   */
  prepaymentAmount?: number
  /**
   * Цена за сутки.
   * @minimum 0
   * @maximum 999999.99
   */
  price?: number
  /**
   * Отмены бронирования.
   * @maxLength 150
   */
  reasonOfCancel?: string
  /** Причина закрытия номера. Обязательно для бронирования типа TYPE_CLOSING */
  reasonOfStop?: NewBookingDtoReasonOfStop
  /** Id бронируемого номера */
  roomId: number
  /** Тип бронирования (обычное или временное закрытие номера, например, для ремонта) */
  type: NewBookingDtoType
}

/**
 * Тип бронирования (обычное или временное закрытие номера, например, для ремонта)
 */
export type BookingDtoType =
  (typeof BookingDtoType)[keyof typeof BookingDtoType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BookingDtoType = {
  TYPE_BOOKING: "TYPE_BOOKING",
  TYPE_CLOSING: "TYPE_CLOSING",
} as const

/**
 * Статус бронирования (Первичное, Подтвержденное, Заселен, Выселен, Отменено). По умолчанию для бронирования типа TYPE_BOOKING устанавливается статус STATUS_INITIAL. Если поле isPrepaid=true - статус STATUS_CONFIRMED. Для бронирования типа TYPE_CLOSING устанавливается статус STATUS_CONFIRMED. Остальные статусы присваиваются пользователем вручную.
 */
export type BookingDtoStatus =
  (typeof BookingDtoStatus)[keyof typeof BookingDtoStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BookingDtoStatus = {
  STATUS_INITIAL: "STATUS_INITIAL",
  STATUS_CONFIRMED: "STATUS_CONFIRMED",
  STATUS_CHECKED_IN: "STATUS_CHECKED_IN",
  STATUS_CHECKED_OUT: "STATUS_CHECKED_OUT",
  STATUS_CANCELLED: "STATUS_CANCELLED",
} as const

/**
 * Причина закрытия номера. Обязательно для бронирования типа TYPE_CLOSING
 */
export type BookingDtoReasonOfStop =
  (typeof BookingDtoReasonOfStop)[keyof typeof BookingDtoReasonOfStop]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BookingDtoReasonOfStop = {
  REASON_UNAVAILABLE: "REASON_UNAVAILABLE",
  REASON_RENOVATION: "REASON_RENOVATION",
  REASON_CLEANING: "REASON_CLEANING",
} as const

export interface BookingDto {
  /**
   * Стоимость за весь период бронирования.
   * @minimum 0
   * @maximum 9999999.99
   */
  amount: number
  /** Дата заезда в формате "dd.MM.yyyy" */
  checkInDate: string
  /** Время заезда в формате "HH:mm" */
  checkInTime?: string
  /** Дата выезда в формате "dd.MM.yyyy" */
  checkOutDate: string
  /** Время выезда в формате "HH:mm" */
  checkOutTime?: string
  /**
   * Комментарий к бронированию
   * @maxLength 150
   */
  comment?: string
  /**
   * Количество дней пребывания = Дата окончания бронирования-Дата начала бронирования +1.
   * @minimum 1
   */
  daysOfBooking?: number
  /** Ссылка на файл-вложение */
  fileUrl?: string
  id: number
  /** Внесена ли предоплата */
  isPrepaid: boolean
  /** Список питомцев в бронировании */
  pets?: PetDto[]
  /**
   * Сумма предоплаты.
   * @minimum 0
   * @maximum 999999.99
   */
  prepaymentAmount: number
  /**
   * Цена за сутки.
   * @minimum 0
   * @maximum 999999.99
   */
  price: number
  /**
   * Отмены бронирования.
   * @maxLength 150
   */
  reasonOfCancel?: string
  /** Причина закрытия номера. Обязательно для бронирования типа TYPE_CLOSING */
  reasonOfStop?: BookingDtoReasonOfStop
  room: RoomDto
  /** Статус бронирования (Первичное, Подтвержденное, Заселен, Выселен, Отменено). По умолчанию для бронирования типа TYPE_BOOKING устанавливается статус STATUS_INITIAL. Если поле isPrepaid=true - статус STATUS_CONFIRMED. Для бронирования типа TYPE_CLOSING устанавливается статус STATUS_CONFIRMED. Остальные статусы присваиваются пользователем вручную. */
  status: BookingDtoStatus
  /** Тип бронирования (обычное или временное закрытие номера, например, для ремонта) */
  type: BookingDtoType
}

/**
 * Код статуса HTTP-ответа
 */
export type ErrorHttpStatus =
  (typeof ErrorHttpStatus)[keyof typeof ErrorHttpStatus]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ErrorHttpStatus = {
  "100_CONTINUE": "100 CONTINUE",
  "101_SWITCHING_PROTOCOLS": "101 SWITCHING_PROTOCOLS",
  "102_PROCESSING": "102 PROCESSING",
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
  /** Список стектрейсов или описания ошибок */
  errors?: string[]
  /** Код статуса HTTP-ответа */
  httpStatus?: ErrorHttpStatus
  /** Сообщение об ошибке */
  message?: string
  /** Общее описание причины ошибки */
  reason?: string
  /** Дата и время когда произошла ошибка (в формате "yyyy-MM-dd HH:mm:ss") */
  timestamp?: string
}

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

/**
 * Добавление нового бронирования. Доступно только пользователям с ролью ROLE_BOSS и ROLE_ADMIN.
 * @summary Добавить новое бронирование
 */
export const addBooking = (
  newBookingDto: BodyType<NewBookingDto>,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<BookingDto>(
    {
      url: `/bookings`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: newBookingDto,
    },
    options
  )
}

/**
 * Получение бронирования по ID. Доступно только для пользователей с ролью ROLE_BOSS или ROLE_ADMIN.
 * @summary Получить информацию о бронировании
 */
export const getBookingById = (
  bookingId: number,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<BookingDto>(
    { url: `/bookings/${bookingId}`, method: "GET" },
    options
  )
}

/**
 * Удаление существующего бронирования. Доступно только пользователям ROLE_BOSS и ROLE_ADMIN.
 * @summary Удалить информацию о бронировании (безвозвратно)
 */
export const deleteBookingById = (
  bookingId: number,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<void>(
    { url: `/bookings/${bookingId}`, method: "DELETE" },
    options
  )
}

/**
 * Редактирование существующего бронирования. Доступно пользователям ROLE_BOSS и ROLE_ADMIN.
 * @summary Изменить информацию об имеющемся бронировании
 */
export const updateBooking = (
  bookingId: number,
  updateBookingDto: BodyType<UpdateBookingDto>,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<BookingDto>(
    {
      url: `/bookings/${bookingId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: updateBookingDto,
    },
    options
  )
}

/**
 * Проверка бронирований, блокирующих использование номера в заданные даты. Используется при создании нового бронирования, либо при редактировании существующего бронирования со сменой номера. При наличии блокирующих бронирований возвращает ConflictException. Доступно пользователям ROLE_BOSS и ROLE_ADMIN.
 * @summary Проверить доступность номера для бронирования в заданные даты при создании нового бронирования
 */
export const checkRoomAvailableInDates = (
  roomId: number,
  params: CheckRoomAvailableInDatesParams,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<void>(
    {
      url: `/bookings/rooms/${roomId}/checkRoomAvailable`,
      method: "GET",
      params,
    },
    options
  )
}

/**
 * Проверка бронирований, блокирующих использование номера в заданные даты. Используется при редактировании дат в существующем бронировании без смены номера.При наличии блокирующих бронирований возвращает ConflictException. Доступно пользователям ROLE_BOSS и ROLE_ADMIN.
 * @summary Проверить доступность номера для бронирования в заданные даты при редактировании бронирования
 */
export const checkUpdateBookingRoomAvailableInDates = (
  bookingId: number,
  roomId: number,
  params: CheckUpdateBookingRoomAvailableInDatesParams,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<void>(
    {
      url: `/bookings/${bookingId}/rooms/${roomId}/checkUpdateRoomAvailable`,
      method: "GET",
      params,
    },
    options
  )
}

/**
 * Поиск бронирований, пересекающихся с выбранными датами. Например, дата окончания имеющегося в БД бронирования = checkInDate в текущем запросе или дата начала имеющегося в БД бронирования = checkOutDate в текущем запросе. Доступно пользователям ROLE_BOSS и ROLE_ADMIN.
 * @summary Поиск пересекающихся по краям бронирований
 */
export const findCrossingBookingsForRoomInDates = (
  roomId: number,
  params: FindCrossingBookingsForRoomInDatesParams,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<BookingDto[]>(
    {
      url: `/bookings/rooms/${roomId}/crossingBookingsOfRoomInDates`,
      method: "GET",
      params,
    },
    options
  )
}

/**
 * Поиск блокирующих бронирований, накладывающихся на выбранные даты в том числе на днях в середине бронирования. Доступно пользователям ROLE_BOSS и ROLE_ADMIN.
 * @summary Поиск блокирующих бронирований, накладывающихся на проверяемые даты
 */
export const findBlockingBookingsForRoomInDates = (
  roomId: number,
  params: FindBlockingBookingsForRoomInDatesParams,
  options?: SecondParameter<typeof axiosInstance>
) => {
  return axiosInstance<BookingDto[]>(
    {
      url: `/bookings/rooms/${roomId}/blockingBookingsInDates`,
      method: "GET",
      params,
    },
    options
  )
}

export type AddBookingResult = NonNullable<
  Awaited<ReturnType<typeof addBooking>>
>
export type GetBookingByIdResult = NonNullable<
  Awaited<ReturnType<typeof getBookingById>>
>
export type DeleteBookingByIdResult = NonNullable<
  Awaited<ReturnType<typeof deleteBookingById>>
>
export type UpdateBookingResult = NonNullable<
  Awaited<ReturnType<typeof updateBooking>>
>
export type CheckRoomAvailableInDatesResult = NonNullable<
  Awaited<ReturnType<typeof checkRoomAvailableInDates>>
>
export type CheckUpdateBookingRoomAvailableInDatesResult = NonNullable<
  Awaited<ReturnType<typeof checkUpdateBookingRoomAvailableInDates>>
>
export type FindCrossingBookingsForRoomInDatesResult = NonNullable<
  Awaited<ReturnType<typeof findCrossingBookingsForRoomInDates>>
>
export type FindBlockingBookingsForRoomInDatesResult = NonNullable<
  Awaited<ReturnType<typeof findBlockingBookingsForRoomInDates>>
>
