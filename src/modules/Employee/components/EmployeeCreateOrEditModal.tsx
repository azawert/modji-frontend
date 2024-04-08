import { UserDto } from "@/generated/user"
import { useEffect } from "react"
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form"
import {
  EMAIL_VALIDATION_PATTERN,
  ROLE_SELECT_DATA,
  TCreateUser,
} from "../const"
import { Box, IconButton, Modal, Typography } from "@mui/material"
import { Close } from "@mui/icons-material/"
import { TextField } from "@/shared/ui/TextField"
import { Select } from "@/shared/ui/Select"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { mapperCreateUserFormToAnUserRequest } from "../utils"

/**
 * @prop isOpen флаг открытия модального окна
 * @prop onClose функция обработчик закрытия модального окна
 * @prop createUser функция обработчик создания/обновления сущности
 * @prop [isEditing] флаг редактирования сотрудника
 * @prop [data] данные для текущего сотрудника для редактирования
 */
type TProps = {
  isOpen: boolean
  onClose: () => void
  form: UseFormReturn<TCreateUser>
  createUser?: (data: UserDto) => void
  editUser?: (data: UserDto) => void
  isEditing?: boolean
  editUserData?: UserDto
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 616,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: "0px 8px 16px 0px #00000029",
  p: 4,
}

export const EmployeeCreateOrEditModal: React.FC<TProps> = props => {
  const {
    isOpen,
    onClose,
    createUser,
    isEditing,
    editUserData,
    form,
    editUser,
  } = props
  const {
    formState: { errors },
    handleSubmit,
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
        setValue(name as keyof TCreateUser, value, { shouldTouch: true })
      )
      if (editUserData.password) {
        setValue("confirmPassword", editUserData.password, {
          shouldTouch: true,
        })
      }
    }
  }, [isEditing, editUserData, setValue])

  /** Проверка при изменении пароля, если пароль изменился и уже введен подтверждение пароля, то вкидывать ошибку */
  useEffect(() => {
    if (confirmPassword.length === 0) return
    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Пароли не совпадают" })
    } else {
      clearErrors("confirmPassword")
    }
  }, [password])

  const onSubmitCreateUser: SubmitHandler<TCreateUser> = data => {
    createUser?.(mapperCreateUserFormToAnUserRequest(data))
    onClose()
  }

  const onSubmitEditUser: SubmitHandler<TCreateUser> = data => {
    if (!editUserData?.id) return
    editUser?.({
      ...data,
      id: editUserData.id!,
      isActive: editUserData?.isActive || true,
    })
    onClose()
  }

  return (
    <form
      className="mt-2"
      onSubmit={handleSubmit(isEditing ? onSubmitEditUser : onSubmitCreateUser)}
      id="form_create_employee"
    >
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby={
          isEditing ? "modal-update-employee" : "modal-create-employee"
        }
        aria-describedby={
          isEditing
            ? "modal-update-employee-form"
            : "modal-create-employee-form"
        }
      >
        <Box sx={style}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography fontSize={24} fontWeight={800}>
                {isEditing
                  ? "Редактировать данные сотрудника"
                  : "Новый сотрудник"}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <TextField
            id="lastName"
            placeholder="Фамилия"
            label="Фамилия"
            error={errors.lastName?.message}
            maxLength={30}
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
              />
            )}
          />
          <TextField
            id="password"
            placeholder="Пароль"
            label="Пароль"
            isRequired
            error={errors.password?.message}
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
          <Box
            display={"flex"}
            marginTop="8px"
            justifyContent={"space-between"}
          >
            <Button
              size={EButtonSize.Large}
              variant={EButtonVariant.Secondary}
              onClick={onClose}
            >
              Отменить
            </Button>
            <Button
              size={EButtonSize.Large}
              variant={EButtonVariant.Primary}
              type="submit"
              form={"form_create_employee"}
            >
              {isEditing ? "Сохранить" : "Создать"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </form>
  )
}
