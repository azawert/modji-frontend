import { Dialog, DialogTitle, Box } from "@mui/material"
import React from "react"
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

/**
 * @prop isOpen флаг открытия модального окна
 * @prop renderHeader функция отрисовки хедера модального окна
 * @prop renderMainContent функция отрисовки основного контента
 * @prop renderFooter функция отрисовки футера модального окна
 * @prop renderSubText функция отрисовки подтекста основного контента
 * @prop onClose функция закрытия модального окна
 * @prop form форма которая используется для сабмита (из react-hook-form)
 * @prop formId айди формы, используется для обработки сабмита по кнопке
 * @prop onSubmit обработчик сабмита
 */
type TProps<K extends FieldValues> = {
  isOpen: boolean
  onClose: () => void
  ariaLabelledby: string
  ariaDescribedby: string
  renderHeader: () => React.ReactNode
  renderBody: () => React.ReactNode
  renderFooter: () => React.ReactNode
  form: UseFormReturn<K>
  formId: string
  onSubmit: SubmitHandler<K>
}

/**
 * Общий компонент модального окна для создания или редактирования сущности
 * @param props Пропсы для компонента модального окна создания/редактирования сущности
 * @returns Компонент модального окна создания/редактирования сущности
 */
export const CreateOrEditModal = <K extends FieldValues>(props: TProps<K>) => {
  const {
    ariaDescribedby,
    ariaLabelledby,
    form,
    isOpen,
    onClose,
    onSubmit,
    formId,
    renderBody,
    renderFooter,
    renderHeader,
  } = props

  const { handleSubmit } = form

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
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
      <form onSubmit={handleSubmit(d => onSubmit?.(d))} id={formId}>
        <DialogTitle display="flex" justifyContent="flex-end">
          {renderHeader()}
        </DialogTitle>
        <div className="pb-10 px-16">
          {renderBody()}
          <Box display={"flex"} justifyContent={"space-between"}>
            {renderFooter()}
          </Box>
        </div>
      </form>
    </Dialog>
  )
}
