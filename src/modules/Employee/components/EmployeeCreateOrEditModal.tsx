import { UserDto, UserDtoRole } from "@/generated/user"
import { useCallback, useEffect } from "react"
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form"
import {
  EMAIL_VALIDATION_PATTERN,
  ROLE_SELECT_DATA,
  TCreateUser,
} from "../const"
import { IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material/"
import { TextField } from "@/shared/ui/TextField"
import { Select } from "@/shared/ui/Select"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import {
  mapperCreateUserFormToAnUserCreateRequest,
  mapperCreateUserFormToAnUserUpdateRequest,
  roleMapperForRussianLanguage,
} from "../utils"
import { addConfirmationNotification } from "@/shared/utils/utils"
import { CreateOrEditModal } from "@/shared/ui/modal/CreateOrEditModal"

/**
 * @prop isOpen флаг открытия модального окна
 * @prop onClose функция обработчик закрытия модального окна
 * @prop form форма для создания/обновления
 * @prop [handleFormSubmit] функция обработчик при успешном заполнении формы
 * @prop [isEditing] флаг редактирования сотрудника
 * @prop [editUserData] данные для текущего сотрудника для редактирования
 */

type TProps = {
  isOpen: boolean
  onClose: () => void
  form: UseFormReturn<TCreateUser>
  handleFormSubmit?: (data: UserDto) => void
  isEditing?: boolean
  editUserData?: UserDto
}

export const EmployeeCreateOrEditModal: React.FC<TProps> = props => {
  const { isOpen, onClose, handleFormSubmit, isEditing, editUserData, form } =
    props
  const confirmationNotification = addConfirmationNotification()
  const {
    formState: { errors, isDirty },
    register,
    setValue,
    clearErrors,
    setError,
    control,
    watch,
  } = form
  const [password, confirmPassword] = watch(["password", "confirmPassword"])

  /** Автозаполнение полей при наличии флага и данных */
  useEffect(() => {
    if (isEditing && editUserData) {
      Object.entries(editUserData).forEach(([name, value]) =>
        setValue(name as keyof TCreateUser, value)
      )
      if (editUserData.password) {
        setValue("confirmPassword", editUserData.password)
      }
    }
  }, [isEditing, editUserData, setValue])

  const handleCloseModalWindow = () => {
    if (isDirty) {
      confirmationNotification(onClose)
      return
    } else {
      onClose()
    }
  }

  /** Проверка при изменении пароля, если пароль изменился и уже введен подтверждение пароля, то вкидывать ошибку */
  useEffect(() => {
    if (confirmPassword.length === 0) return
    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Пароли не совпадают" })
    } else {
      clearErrors("confirmPassword")
    }
  }, [password])

  const onSubmit: SubmitHandler<TCreateUser> = data => {
    handleFormSubmit?.(
      isEditing
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          mapperCreateUserFormToAnUserUpdateRequest(data, editUserData?.id!)
        : mapperCreateUserFormToAnUserCreateRequest(data)
    )
  }

  const renderHeader = () => (
    <IconButton onClick={handleCloseModalWindow}>
      <Close />
    </IconButton>
  )

  /** Для компонента из material-ui select необходимо пробрасывать доп функцию для отображения значения или плейсхолдера, без нее плейсхолдер не будет отображаться */
  const renderValue = useCallback(
    (value: string) =>
      value?.length ? (
        roleMapperForRussianLanguage[value as UserDtoRole]
      ) : (
        <Typography color="#757575">Должность*</Typography>
      ),
    []
  )

  const renderBody = () => (
    <>
      <Typography fontSize={24} fontWeight={800} mb="16px">
        {isEditing ? "Редактировать данные сотрудника" : "Новый сотрудник"}
      </Typography>

      <TextField
        id="lastName"
        placeholder="Фамилия"
        label="Фамилия"
        error={errors.lastName?.message}
        maxLength={30}
        marginBottom="16px"
        {...register("lastName", {
          minLength: {
            value: 1,
            message: "Введите больше 1 символа",
          },
          maxLength: {
            value: 30,
            message: "Введите меньше 30 символов",
          },
        })}
      />
      <TextField
        id="name"
        placeholder="Имя"
        label="Имя"
        isRequired
        error={errors.firstName?.message}
        maxLength={15}
        marginBottom="16px"
        {...register("firstName", {
          minLength: {
            value: 1,
            message: "Введите больше 1 символа",
          },
          maxLength: {
            value: 15,
            message: "Введите меньше 15 символов",
          },
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
        })}
      />
      <TextField
        id="middleName"
        placeholder="Отчество"
        label="Отчество"
        error={errors.middleName?.message}
        maxLength={15}
        marginBottom="16px"
        {...register("middleName", {
          minLength: {
            value: 1,
            message: "Введите больше 1 символа",
          },
          maxLength: {
            value: 15,
            message: "Введите меньше 15 символов",
          },
        })}
      />
      <TextField
        id="email"
        placeholder="Адрес электронной почты*"
        label="Адрес электронной почты"
        isRequired
        error={errors.email?.message}
        marginBottom="16px"
        {...register("email", {
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
          pattern: {
            value: EMAIL_VALIDATION_PATTERN,
            message:
              "Такой адрес электронной почты не существует. Пожалуйста, проверьте правильность ввода и попробуйте снова.",
          },
        })}
      />
      <Controller
        control={control}
        name="role"
        rules={{
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
        }}
        render={({ field }) => (
          <Select
            data={
              editUserData?.role === UserDtoRole.ROLE_BOSS
                ? [
                    ...ROLE_SELECT_DATA,
                    {
                      label: "Управляющий",
                      value: UserDtoRole.ROLE_BOSS,
                    },
                  ]
                : ROLE_SELECT_DATA
            }
            onChange={value => {
              field.onChange(value)
              field.onBlur()
            }}
            selectedValue={field.value}
            label="Должность*"
            error={errors.role?.message}
            fullWidth
            marginBottom="16px"
            placeholder="Должность*"
            renderValue={renderValue}
            onBlur={field.onBlur}
          />
        )}
      />
      <TextField
        id="password"
        placeholder="Пароль"
        label="Пароль"
        isRequired
        error={errors.password?.message}
        marginBottom="16px"
        maxLength={10}
        {...register("password", {
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
          pattern: {
            value: /^(?!.*\s).*$/,
            message:
              "Извините, это поле не может содержать пробелы. Используйте в этом поле буквы и цифры.",
          },
          minLength: {
            value: 5,
            message: "Введите больше 5 символов",
          },
        })}
      />
      <TextField
        id="confirmPassword"
        placeholder="Пароль повторно"
        label="Пароль повторно"
        isRequired
        error={errors.confirmPassword?.message}
        marginBottom="32px"
        maxLength={10}
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
          pattern: {
            value: /^(?!.*\s).*$/,
            message:
              "Извините, это поле не может содержать пробелы. Используйте в этом поле буквы и цифры.",
          },
          validate: (value: string) => {
            if (value !== password) {
              return "Пароли не совпадают"
            }
          },
          minLength: {
            value: 5,
            message: "Введите больше 5 символов",
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
        form={"form_create_employee"}
        fontSize={16}
        fontWeight={700}
      >
        {isEditing ? "Сохранить" : "Создать"}
      </Button>
    </>
  )
  return (
    <CreateOrEditModal<TCreateUser>
      ariaDescribedby={
        isEditing ? "modal-update-employee-form" : "modal-create-employee-form"
      }
      ariaLabelledby={
        isEditing ? "modal-update-employee" : "modal-create-employee"
      }
      form={form}
      formId="form_create_employee"
      isOpen={isOpen}
      onClose={handleCloseModalWindow}
      onSubmit={onSubmit}
      renderBody={renderBody}
      renderFooter={renderFooter}
      renderHeader={renderHeader}
    />
  )
}
