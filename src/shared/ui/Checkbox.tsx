import { Checkbox, FormControlLabel, styled } from "@mui/material"
import { memo } from "react"

/**
 * @prop value - значение чекбокса
 * @prop onChange - функция для обработки изменения значения
 * @prop [label] - лейбл для отображения
 * @prop [id] - id для чекбокса и лейбла
 * @prop [isDisabled] - флаг для отображения задизейбленного состояния
 */
type TProps = {
  value: boolean
  onChange: (value: boolean) => void
  label?: string
  id?: string
  isDisabled?: boolean
  isCheckedByDefault?: boolean
  labelPlacement: "end" | "start" | "top" | "bottom"
  labelSize?: string
  labelWeight?: string
  borderRadius?: string
  checkboxWidth?: string
  checkboxHeight?: string
}

export const CustomCheckbox: React.FC<TProps> = memo(props => {
  const {
    onChange,
    value,
    id,
    isCheckedByDefault,
    isDisabled,
    label,
    labelPlacement = "end",
    labelSize = 16,
    labelWeight = 400,
    borderRadius = 4,
    checkboxHeight = 16,
    checkboxWidth = 16,
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.checked)

  const StyledCheckboxIcon = styled("span")(({ theme }) => ({
    borderRadius,
    width: checkboxWidth,
    height: checkboxHeight,
    color: "#181A1A",
    border: "1px solid #181A1A",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#E8E8E8",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }))

  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked={isCheckedByDefault}
          disabled={isDisabled}
          onChange={handleChange}
          checked={value}
          id={id}
          icon={<StyledCheckboxIcon />}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
      sx={{
        borderRadius,
        "& .MuiButtonBase-root:hover": {
          backgroundColor: "transparent",
        },
        "& .MuiTypography-root": {
          fontSize: labelSize,
          fontWeight: labelWeight,
          marginLeft: "8px",
        },
        "& .MuiCheckbox-root": {
          borderRadius,
        },
      }}
    />
  )
})
