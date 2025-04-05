import { ReactNode, useEffect, useState } from "react"

import {
  InputBase,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
  styled,
} from "@mui/material"

import { cn } from "@/lib/utils"

import { FieldError } from "../FieldError/FieldError"
import { Label } from "../Label/Label"

export type SelectData = {
  value: string
  label: string
}
type TProps = {
  onChange: (value: string) => void
  label?: string
  selectedValue?: string
  error?: string
  fullWidth?: boolean
  isRequired?: boolean
  className?: string
  marginBottom?: string
  renderNoData?: () => ReactNode
  data?: SelectData[]
  placeholder?: string
  onBlur?: (event: React.ChangeEvent) => void
  width?: string
  disabled?: boolean
  renderValue?: (value: string) => ReactNode
  hasSpaceForLabel?: boolean
  value?: string
}

const CustomizedInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 24,
    position: "relative",
    backgroundColor: "transparent",
    border: "2px solid #D0CFCF",
    fontSize: 16,
    padding: "12px 20px 12px 20px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    marginTop: 0,
  },
}))

export const Select: React.FC<TProps> = props => {
  const {
    data,
    label,
    onChange,
    selectedValue,
    error,
    fullWidth,
    isRequired,
    className,
    marginBottom,
    renderNoData,
    placeholder,
    onBlur,
    width,
    value,
    renderValue,
    disabled,
    hasSpaceForLabel = true,
  } = props
  const handleSelectChange = (e: SelectChangeEvent) => onChange(e.target.value)
  const [preSelectedValue, setPreselectedValue] = useState<string>()

  const labelValue = label || ""

  useEffect(() => {
    if (selectedValue) {
      setPreselectedValue(
        () => data?.find(element => element.value === selectedValue)?.value,
      )
    }
  }, [data, selectedValue])
  return (
    <label htmlFor={label}>
      {hasSpaceForLabel && <Label label={labelValue} isRequired={isRequired} />}
      <div style={{ marginBottom }}>
        <MUISelect
          disabled={disabled}
          labelId={label}
          error={!!error}
          displayEmpty
          renderValue={
            renderValue
              ? () => renderValue(selectedValue || "")
              : selected => {
                  if (!selected || selected.length === 0) {
                    return (
                      <div className="text-basicGreyText">{placeholder}</div>
                    )
                  }
                  return <>{selected}</>
                }
          }
          onChange={handleSelectChange}
          defaultValue={preSelectedValue}
          value={value}
          sx={{
            borderRadius: "24px",
            width,
            ".css-1uwzc1h-MuiSelect-select-MuiInputBase-input:focus": {
              borderRadius: "24px",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
          className={cn(`rounded-24px ${className}`, {
            ["w-full"]: fullWidth,
            ["border-error"]: !!error,
          })}
          input={<CustomizedInput />}
          id={label}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  borderRadius: "24px",
                  border: "2px solid #D0CFCF",
                  marginTop: "5px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  "& .MuiMenuItem-root:active": {
                    backgroundColor: "#D5E1FF",
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#E8E8E8",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "& .MuiSelect-select": {
                    borderRadius: "24px !important",
                  },
                  "& .Mui-focused": {
                    borderColor: "black",
                  },
                },
              },
            },
          }}
          placeholder={placeholder}
          onBlur={onBlur}
          notched={undefined}
        >
          {Array.isArray(data) && data.length
            ? data?.map(element => {
                return (
                  <MenuItem value={element.value} key={element.value}>
                    {element.label}
                  </MenuItem>
                )
              })
            : renderNoData?.()}
        </MUISelect>
        <FieldError error={error || ""} />
      </div>
    </label>
  )
}
