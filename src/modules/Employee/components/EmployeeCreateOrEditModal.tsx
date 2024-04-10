import { UserDto } from "@/generated/user"
import { useEffect } from "react"
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form"
import {
  EMAIL_VALIDATION_PATTERN,
  ROLE_SELECT_DATA,
  TCreateUser,
} from "../const"
import { Box, Dialog, DialogTitle, IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material/"
import { TextField } from "@/shared/ui/TextField"
import { Select } from "@/shared/ui/Select"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import {
  mapperCreateUserFormToAnUserCreateRequest,
  mapperCreateUserFormToAnUserUpdateRequest,
} from "../utils"
import { useNotification } from "@/contexts/notificationContext/useNotificationContext"
import { generateUniqueId } from "@/shared/utils/utils"
import { ENotificationType } from "@/contexts/notificationContext/NotificationContext"

/**
 * @prop isOpen флаг открытия модального окна
 * @prop onClose функция обработчик закрытия модального окна
 * @prop form форма для создания/обновления
 * @prop [handleFormSubmit] функция обработчик при успешном заполнении формы
 * @prop [isEditing] флаг редактирования сотрудника
 * @prop [data] данные для текущего сотрудника для редактирования
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
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    setValue,
    clearErrors,
    setError,
    control,
    watch,
  } = form

  const { addNotification } = useNotification()

  const [password, confirmPassword] = watch(["password", "confirmPassword"])

  /** Автозаполнение полей при наличии флага и данных */
  useEffect(() => {
    if (isEditing && editUserData) {
      Object.entries(editUserData).forEach(([name, value]) =>
        setValue(name as keyof TCreateUser, value, { shouldTouch: true })
      )
      if (editUserData.password) {
        setValue("confirmPassword", editUserData.password, {
          shouldTouch: true,
        })
      }
    }
  }, [isEditing, editUserData, setValue])

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

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModalWindow}
      aria-labelledby={
        isEditing ? "modal-update-employee" : "modal-create-employee"
      }
      aria-describedby={
        isEditing ? "modal-update-employee-form" : "modal-create-employee-form"
      }
      sx={{
        "& .MuiDialogTitle-root": {
          padding: 0,
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "616px",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="form_create_employee">
        <DialogTitle display="flex" justifyContent="flex-end">
          <IconButton onClick={handleCloseModalWindow}>
            <Close />
          </IconButton>
        </DialogTitle>
        <div className="pb-10 px-16">
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
            maxLength={30}
            marginBottom="16px"
            {...register("middleName", {
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
                message: "Введите корректную почту",
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
                data={ROLE_SELECT_DATA}
                onChange={field.onChange}
                selectedValue={field.value}
                label="Должность*"
                error={errors.role?.message}
                fullWidth
                marginBottom="16px"
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
            {...register("password", {
              required: {
                value: true,
                message: "Пожалуйста, заполните это поле",
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
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Пожалуйста, заполните это поле",
              },
              validate: (value: string) => {
                if (value !== password) {
                  return "Пароли не совпадают"
                }
              },
            })}
          />
          <Box display={"flex"} justifyContent={"space-between"}>
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
          </Box>
        </div>
      </form>
    </Dialog>
  )
}
