import React, { ChangeEvent, ReactNode } from "react"
import InputMask, { Props as InputMaskProps } from "react-input-mask"
import { TextField } from "./TextField"

type TPhoneInputProps = Omit<
  React.ComponentProps<typeof TextField>,
  "type" | "value" | "onChange"
> & {
  value: string
  onChange?: (value: string) => void
}

type TInputMaskCorrect = Omit<InputMaskProps, "children"> & {
  children?: (inputProps: unknown) => JSX.Element
}
const InputMaskCorrect: React.FC<TInputMaskCorrect> = ({
  children,
  ...props
}) => {
  const child = children as ReactNode
  return <InputMask {...props}>{child}</InputMask>
}

export const PhoneInput = ({ value, onChange, ...props }: TPhoneInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <InputMaskCorrect
      mask="+7 (***) ***-**-**"
      value={value}
      maskChar=" "
      onChange={handleChange}
      onBlur={props.onBlur}
    >
      {() => <TextField {...props} />}
    </InputMaskCorrect>
  )
}
