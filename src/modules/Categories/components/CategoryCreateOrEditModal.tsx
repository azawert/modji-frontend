import { SubmitHandler, UseFormReturn } from "react-hook-form"
import { TCategoryForm } from "../const"
import { CategoryDto, NewCategoryDto } from "@/generated/categories"
import { CreateOrEditModal } from "@/shared/ui/modal/CreateOrEditModal"
import { TextField } from "@/shared/ui/TextField"
import { IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { useEffect } from "react"
import { useNotification } from "@/contexts/notificationContext/useNotificationContext"
import { ENotificationType } from "@/contexts/notificationContext/NotificationContext"
import { generateUniqueId } from "@/shared/utils/utils"

/** Пропы для модалки создания/редактирования категории
 * @prop isOpen - флаг открытия модалки
 * @prop onClose - функция закрытия модального окна
 * @prop from - форма для модалки
 * @prop [handleSubmit] - функция успешной обработки при корректно заполненных полях
 * @prop [categoryData] - данные для редактирования уже существующей категории
 * @prop [isEditing] - флаг редактирования
 */
type TProps = {
  isOpen: boolean
  onClose: () => void
  form: UseFormReturn<TCategoryForm>
  handleFormSubmit: (data: NewCategoryDto) => void
  categoryData?: CategoryDto
  isEditing?: boolean
  isLoading?: boolean
}

export const CategoryCreateOrEditModal: React.FC<TProps> = props => {
  const {
    form,
    isOpen,
    onClose,
    categoryData,
    handleFormSubmit,
    isEditing,
    isLoading,
  } = props
  const formId = `${isEditing ? "update" : "create"}CategoryForm`

  const {
    register,
    formState: { errors, isDirty },
    setValue,
  } = form
  const { addNotification, removeNotification, notifications } =
    useNotification()

  useEffect(() => {
    if (isEditing && categoryData) {
      Object.entries(categoryData).forEach(([name, key]) =>
        setValue(name as keyof TCategoryForm, key)
      )
    }
  }, [isEditing, categoryData, setValue])

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

  const onSubmit: SubmitHandler<TCategoryForm> = data => {
    handleFormSubmit(data)
    // Необходимо скрывать все нотификации вида confirmation при попытке засабмитить форму
    notifications.forEach(
      ({ id, type }) =>
        type === ENotificationType.CONFIRMATION && removeNotification(id)
    )
  }

  const renderBody = () => (
    <>
      <Typography fontSize={24} fontWeight={800} mb="16px">
        {isEditing ? "Редактировать данные категории" : "Новая категория"}
      </Typography>
      <TextField
        placeholder="Название"
        isRequired
        id="categoryName"
        label="Название"
        marginBottom="16px"
        error={errors?.name?.message}
        maxLength={20}
        {...register("name", {
          required: {
            value: true,
            message: "Пожалуйста, заполните это поле",
          },
          pattern: {
            value: /[а-яА-Яa-zA-Z0-9_]/,
            message: "Название должно содержать минимум 1 букву или цифру",
          },
          minLength: {
            value: 1,
            message: "Введите больше 1 символа",
          },
          maxLength: {
            value: 20,
            message: "Введите меньше 20 символов",
          },
        })}
      />
      <TextField
        placeholder="Описание"
        id="categoryDescription"
        label="Описание"
        marginBottom="32px"
        error={errors?.description?.message}
        isTextarea
        maxLength={250}
        {...register("description", {
          maxLength: {
            value: 250,
            message: "Введите меньше 250 символов",
          },
        })}
      />
    </>
  )

  const renderHeader = () => (
    <IconButton onClick={handleCloseModalWindow}>
      <Close />
    </IconButton>
  )

  const renderFooter = () => (
    <>
      <Button
        size={EButtonSize.Large}
        variant={EButtonVariant.Secondary}
        onClick={handleCloseModalWindow}
        fontSize={16}
        fontWeight={700}
        disabled={isLoading}
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
        isLoading={isLoading}
      >
        {isEditing ? "Сохранить" : "Создать"}
      </Button>
    </>
  )
  return (
    <CreateOrEditModal
      ariaDescribedby={
        isEditing ? "modal-category-update-form" : "modal-category-create-form"
      }
      ariaLabelledby={
        isEditing ? "modal-category-update" : "modal-category-create"
      }
      form={form}
      formId={formId}
      isOpen={isOpen}
      onClose={handleCloseModalWindow}
      onSubmit={onSubmit}
      renderBody={renderBody}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
    />
  )
}
