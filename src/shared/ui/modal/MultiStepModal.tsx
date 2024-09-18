import { TMultiStepModal } from "@/shared/types/types"
import { useState } from "react"
import { Controller, FieldError, FieldValues } from "react-hook-form"
import { Button, EButtonSize, EButtonVariant } from "../Button"
import { Box, Dialog, DialogTitle, Typography } from "@mui/material"
import { TextField } from "../TextField"
import { PhoneInput } from "../PhoneInput"

export const MultiStepModal = <K extends FieldValues>({
  ariaDescribedby,
  ariaLabelledby,
  form,
  formId,
  isOpen,
  onClose,
  onSubmit,
  renderHeader,
  steps,
  title,
  backButtonTextString = "Назад",
  handleFormButtonTextString = "Создать клиента",
  nextStepButtonText = "Следующий шаг",
}: TMultiStepModal<K>) => {
  const [activeStep, setActiveStep] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
    reset,
  } = form
  const currentStep = steps[activeStep]
  const isLastStep = activeStep === steps.length - 1
  const isFirstStep = activeStep === 0

  const handleClickButton = async () => {
    const isValid = await trigger(currentStep.fields.map(field => field.name))
    if (isValid && !isLastStep) {
      setActiveStep(p => p + 1)
    } else if (isValid && isLastStep) {
      handleSubmit(onSubmit)()
      reset()
      setActiveStep(0)
    }
  }

  const handleBackClickButton = () => {
    if (activeStep === 0) return
    setActiveStep(prev => prev - 1)
  }

  const renderFooterButtons = (): React.JSX.Element => (
    <>
      {!isFirstStep && (
        <Button
          variant={EButtonVariant.Secondary}
          size={EButtonSize.Medium}
          onClick={handleBackClickButton}
          fontSize={16}
          fontWeight={700}
        >
          {backButtonTextString}
        </Button>
      )}
      <Button
        variant={EButtonVariant.Primary}
        size={EButtonSize.Medium}
        onClick={handleClickButton}
        type={"button"}
        form={formId}
        fontSize={16}
        fontWeight={700}
      >
        {isLastStep ? handleFormButtonTextString : nextStepButtonText}
      </Button>
    </>
  )

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
      <form onSubmit={handleSubmit(onSubmit)} id={formId}>
        <DialogTitle display="flex" justifyContent="flex-end">
          {renderHeader()}
        </DialogTitle>
        <div className="pb-10 px-16">
          <Typography fontSize={24} fontWeight={800}>
            {title}
          </Typography>
          <Typography fontSize={20} fontWeight={700}>
            {currentStep?.title}
          </Typography>
          {currentStep?.fields.map(
            ({
              label,
              name,
              validation,
              placeholder,
              type,
              isRequired,
              isPhoneField,
            }) =>
              !isPhoneField ? (
                <TextField
                  id={name.toString()}
                  placeholder={placeholder || "Введите данные"}
                  type={type || "text"}
                  label={label}
                  isRequired={isRequired}
                  error={(errors[name] as FieldError)?.message}
                  key={label + name}
                  {...register(name, validation)}
                />
              ) : (
                <Controller
                  key={label + name}
                  name={name}
                  control={control}
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        {...field}
                        id={name.toString()}
                        placeholder={placeholder || "Введите данные"}
                        label={label}
                        isRequired={isRequired}
                        error={(errors[name] as FieldError)?.message}
                      />
                    )
                  }}
                />
              )
          )}
          <Box
            display={"flex"}
            justifyContent={isFirstStep ? "flex-end" : "space-between"}
            mt="32px"
          >
            {renderFooterButtons()}
          </Box>
        </div>
      </form>
    </Dialog>
  )
}
