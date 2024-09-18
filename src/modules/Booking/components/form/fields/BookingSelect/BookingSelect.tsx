import { cn } from "@/lib/utils"
import {
  InputBase,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
  styled,
} from "@mui/material"
import { forwardRef, SelectHTMLAttributes } from "react"
import { ChangeHandler, FieldValues, UseFormRegister } from "react-hook-form"

export type SelectData = {
  value: string
  label: string
}

type HTMLSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value" | "accept"
>

interface TProps extends HTMLSelectProps {
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
  onChange?: ChangeHandler
  onSelectChange?: (e: string) => void
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
      onSelectChange,
    } = props

    const handleSelectChange = (e: SelectChangeEvent) => {
      if (onSelectChange) onSelectChange(e.target.value)
    }

    return (
      <label htmlFor={label} className={cn({ ["w-full"]: fullWidth })}>
        <span className="mb-1 text-sm text-basicGreyText active:border-basicBlack text-small">
          {label}
          <span className="font-semibold ml-0.5 text-basicGreyText ">
            {isRequired ? "*" : ""}
          </span>
        </span>
        <div style={{ marginBottom }} className="flex flex-col">
          <MUISelect
            displayEmpty
            ref={ref}
            labelId={label}
            error={!!error}
            onChange={handleSelectChange}
            value={value}
            sx={{
              borderRadius: "24px",
              marginBottom: "7px",
              ".css-1uwzc1h-MuiSelect-select-MuiInputBase-input:focus": {
                borderRadius: "24px",
              },
              ".Mui-error": {
                border: " 2px solid #ff7878",
              },
            }}
            className={cn(`rounded-24px ${className}`, {
              ["w-full"]: fullWidth,
              ["border-error"]: !!error,
            })}
            input={<CustomizedInput />}
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
          <span className="text-error font-semibold text-small h-2">
            {error}
          </span>
        </div>
      </label>
    )
  }
)

BookingSelect.displayName = "Select"
