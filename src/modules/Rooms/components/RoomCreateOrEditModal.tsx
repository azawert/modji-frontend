import { useEffect, useMemo, useState } from "react"
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form"
import { IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material/"
import { TextField } from "@/shared/ui/TextField"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { useNotification } from "@/contexts/notificationContext/useNotificationContext"
import { generateUniqueId } from "@/shared/utils/utils"
import { ENotificationType } from "@/contexts/notificationContext/NotificationContext"
import { CreateOrEditModal } from "@/shared/ui/modal/CreateOrEditModal"
import { TRoomCreateForm } from "../pages/RoomsPage"
import { NewRoomDto, RoomDto } from "@/generated/room"
import {
  mapperFormToAnCreateRequest,
  mapperFormToAnUpdateRequest,
} from "../utils"
import { SelectWithCategories } from "./SelectWithCategories"
import { MaskedTextField } from "@/shared/ui/MaskedTextField"
import { useCheckUniqueRoomNumber } from "@/modules/Rooms/api/queries.ts"
import { useDebounce } from "@/shared/hooks/hooks.ts"
import { useCallback } from 'react'

/**
 * @prop isOpen флаг открытия модального окна
 * @prop onClose функция обработчик закрытия модального окна
 * @prop form форма для создания/обновления
 * @prop [handleFormSubmit] функция обработчик при успешном заполнении формы
 * @prop [isEditing] флаг редактирования сотрудника
 * @prop [editRoomData] данные для текущего сотрудника для редактирования
 */

type TProps = {
  isOpen: boolean
  onClose: () => void
  form: UseFormReturn<TRoomCreateForm>
  handleFormSubmit?: (data: NewRoomDto) => void
  isEditing?: boolean
  editRoomData?: RoomDto
}

export const RoomCreateOrEditModal: React.FC<TProps> = props => {
  const { isOpen, onClose, handleFormSubmit, isEditing, editRoomData, form } =
    props

  const {
    formState: { errors, isDirty },
    register,
    setValue,
    control,
    watch,
    clearErrors,
  } = form
  const formId = `${isEditing ? "update" : "create"}RoomForm`

  const { addNotification, notifications, removeNotification } =
    useNotification()

  const [roomNumber] = watch(["number"])
  const [prevRoomNumberValue, setPrevRoomNumberValue] = useState<
    string | undefined
  >(undefined)

  const debouncedValue = useDebounce(roomNumber, 500)

  /**
   * Функция возвращающая признак изменения номера при редактировании
   */
  const hasRoomNumberNotChanged = useCallback(() => roomNumber === prevRoomNumberValue, [roomNumber, prevRoomNumberValue])

  const { data: isRoomNumberAvailable } = useCheckUniqueRoomNumber(
    debouncedValue,
    !hasRoomNumberNotChanged()
  )

  /** Автозаполнение полей при наличии флага и данных */
  useEffect(() => {
    if (isEditing && editRoomData) {
      Object.entries(editRoomData).forEach(([name, value]) => {
        setValue(name as keyof TRoomCreateForm, value)
      })
      setValue("category", editRoomData?.categoryDto?.id?.toString() ?? "0")
      setPrevRoomNumberValue(editRoomData.number)
    }
  }, [isEditing, setValue, editRoomData])

  // в rhf не получается проставить ошибку, при получении ответа от реста, т.к она просто сбрасывается при расфокусе с поля, вроде есть другое решение, но пока как есть
  const getTextErrorForRoomNumber = useMemo(() => {
    if (isRoomNumberAvailable?.data === false && !hasRoomNumberNotChanged()) {
      return "Комната с таким номером уже существует в системе"
    }
    if (errors?.number) {
      return errors.number.message
    }
  }, [errors.number, hasRoomNumberNotChanged, isRoomNumberAvailable?.data])
  const handleCloseModalWindow = () => {
    if (isDirty) {
      addNotification({
        id: generateUniqueId(),
        isOpened: true,
        text: "Вы точно хотите выйти без сохранения введенных данных?",
        type: ENotificationType.CONFIRMATION,
        withConfirmationButtons: true,
        handleCloseForm: onClose,
        notificationWidth: "342",
      })
      return
    } else {
      onClose()
      clearErrors()
    }
  }

  const onSubmit: SubmitHandler<TRoomCreateForm> = data => {
    if (isEditing) {
      const updateData = mapperFormToAnUpdateRequest(data)
      if (updateData.number !== undefined) {
        handleFormSubmit?.({
          categoryId: updateData.categoryId || 0,
          number: updateData.number,
          area: updateData.area,
          description: updateData.description,
        })
      }
    } else {
      handleFormSubmit?.(mapperFormToAnCreateRequest(data))
    }
    notifications.forEach(({ id, type }) => {
      if (type === ENotificationType.CONFIRMATION) removeNotification(id)
    })
  }

  const isMainButtonDisabled = () => !!getTextErrorForRoomNumber

  const renderHeader = () => (
    <IconButton onClick={handleCloseModalWindow}>
      <Close />
    </IconButton>
  )

  const renderBody = () => (
    <>
      <Typography fontSize={24} fontWeight={800} mb="16px">
        {isEditing ? "Редактировать данные номера" : "Новый номер"}
      </Typography>

      <Controller
        control={control}
        name="category"
        rules={{
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <SelectWithCategories
              onChange={field.onChange}
              value={field.value}
              error={error?.message}
              onBlur={field.onBlur}
            />
          )
        }}
      />
      <TextField
        id="roomNumber"
        placeholder="Номер комнаты"
        label="Номер комнаты"
        isRequired
        maxLength={100}
        marginBottom="16px"
        error={getTextErrorForRoomNumber}
        {...register("number", {
          minLength: {
            value: 1,
            message: "Введите больше 1 символа",
          },
          maxLength: {
            value: 100,
            message: "Введите меньше 100 символов",
          },
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
          pattern: {
            value: /^(?=.*[0-9])|(?=.*[а-яА-Я]).*$/,
            message:
              "Пожалуйста, используйте в этом поле не менее одной цифры или буквы",
          },
        })}
      />
      <Controller
        control={control}
        name="area"
        render={({ field }) => (
          <MaskedTextField
            id="roomArea"
            mask="XXXX,XX"
            placeholder="Площадь"
            label="Площадь"
            {...field}
          />
        )}
      />
      <TextField
        id="roomDescription"
        placeholder="Описание"
        label="Описание"
        error={errors.description?.message}
        marginBottom="32px"
        maxLength={250}
        isTextarea
        {...register("description", {
          maxLength: {
            value: 250,
            message: "Введите меньше 250 символов",
          },
        })}
      />
    </>
  )

  const renderFooter = () => (
    <>
      <Button
        size={EButtonSize.Large}
        variant={EButtonVariant.Secondary}
        onClick={handleCloseModalWindow}
        fontSize={16}
        fontWeight={700}
      >
        Отменить
      </Button>
      <Button
        size={EButtonSize.Large}
        variant={EButtonVariant.Primary}
        type="submit"
        form={formId}
        fontSize={16}
        fontWeight={700}
        disabled={isMainButtonDisabled()}
      >
        {isEditing ? "Сохранить" : "Создать"}
      </Button>
    </>
  )
  return (
    <CreateOrEditModal<TRoomCreateForm>
      ariaDescribedby={
        isEditing ? "modal-update-room-form" : "modal-create-Room-form"
      }
      ariaLabelledby={isEditing ? "modal-update-room" : "modal-create-room"}
      form={form}
      formId={formId}
      isOpen={isOpen}
      onClose={handleCloseModalWindow}
      onSubmit={onSubmit}
      renderBody={renderBody}
      renderFooter={renderFooter}
      renderHeader={renderHeader}
    />
  )
}
