import { cn } from "@/lib/utils"
import { CustomInputBase } from "@/shared/ui/Inputs/CustomInputBase/CustomInputBase"
import { FieldError } from "@/shared/ui/Inputs/FieldError/FieldError"
import { Label } from "@/shared/ui/Inputs/Label/Label"
import { Select as MUISelect, MenuItem, SelectChangeEvent } from "@mui/material"
import { forwardRef, SelectHTMLAttributes } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

export type SelectData = {
  value: string
  label: string
}

type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value" | "accept"
>

interface TProps extends HTMLSelectProps {
  onChange: (value: string) => void
  label?: string
  value?: string
  error?: string
  fullWidth?: boolean
  isRequired?: boolean
  className?: string
  marginBottom?: string
  renderNoData?: () => React.ReactNode
  data?: SelectData[]
  placeholder?: string
  register?: UseFormRegister<FieldValues>
  hasSpaceForLabel?: boolean
}

export const BookingSelect = forwardRef<HTMLSelectElement, TProps>(
  (props, ref) => {
    const {
      data,
      label,
      value,
      error,
      fullWidth,
      isRequired,
      className,
      marginBottom,
      renderNoData,
      placeholder,
      register,
      onChange,
      disabled,
    } = props

    const handleSelectChange = (e: SelectChangeEvent) => {
      onChange(e.target.value)
    }

    return (
      <label htmlFor={label} className={cn({ ["w-full"]: fullWidth })}>
        <Label label={label || ""} isRequired={isRequired} />

        <div style={{ marginBottom }} className="flex flex-col">
          <MUISelect
            disabled={disabled}
            displayEmpty
            ref={ref}
            labelId={label}
            error={!!error}
            onChange={handleSelectChange}
            value={value}
            sx={{
              ".css-1uwzc1h-MuiSelect-select-MuiInputBase-input:focus": {
                borderRadius: "24px",
              },
            }}
            className={cn(`rounded-24px ${className}`, {
              ["w-full"]: fullWidth,
              ["border-error"]: !!error,
            })}
            input={<CustomInputBase />}
            id={label}
            renderValue={selected => {
              if (selected.length === 0) {
                return <div className="text-basicGreyText">{placeholder}</div>
              }

              return selected
            }}
            MenuProps={{
              slotProps: {
                paper: {
                  sx: {
                    borderRadius: "24px",
                    border: "2px solid #D0CFCF",
                    marginTop: "5px",
                    "& .MuiMenuItem-root:active": {
                      backgroundColor: "#D5E1FF",
                    },
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: "#E8E8E8",
                    },
                  },
                },
              },
            }}
            placeholder={placeholder}
            {...register}
          >
            {Array.isArray(data)
              ? data.map(element => (
                  <MenuItem value={element.value} key={element.value}>
                    {element.label}
                  </MenuItem>
                ))
              : renderNoData?.()}
          </MUISelect>
          <FieldError error={error || ""} />
        </div>
      </label>
    )
  }
)

BookingSelect.displayName = "Select"
