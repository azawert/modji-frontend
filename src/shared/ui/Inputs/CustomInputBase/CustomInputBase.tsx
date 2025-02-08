import { cn } from "@/lib/utils"
import { InputBase, InputBaseProps, styled } from "@mui/material"
import { forwardRef } from "react"

const CustomizedInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: "transparent",
    fontSize: 16,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    marginTop: 0,
    padding: 0,
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
  },
  "& .MuiInputBase-inputMultiline": {
    paddingLeft: "20px",
    paddingTop: "12px",
  },
}))

const disabled = "opacity-50 hover:bg-indigo-100"
const errored = "border-error"

interface ICustomInputBase {
  isDisabled?: boolean
  error?: boolean
}

export const CustomInputBase = forwardRef<
  HTMLInputElement,
  InputBaseProps & ICustomInputBase
>((props, ref) => {
  const { isDisabled, error, className, ...rest } = props
  return (
    <CustomizedInput
      ref={ref}
      {...rest}
      className={cn(
        `border-2 border-basicGrey  rounded-24px focus-within:border-basicBlack py-3 px-5 w-full ${className}`,
        {
          [disabled]: isDisabled,
          [errored]: error,
        }
      )}
    />
  )
})
