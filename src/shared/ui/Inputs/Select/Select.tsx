import { cn } from "@/lib/utils"
import { CustomInputBase } from "@/shared/ui/Inputs/CustomInputBase/CustomInputBase"
import { FieldError } from "@/shared/ui/Inputs/FieldError/FieldError"
import { Label } from "@/shared/ui/Inputs/Label/Label"
import {
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
  MenuItemProps,
} from "@mui/material"
import {
  forwardRef,
  SelectHTMLAttributes,
  ReactNode,
  useState,
  useEffect,
} from "react"
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
  renderNoData?: () => ReactNode
  data?: ItemProps[]
  placeholder?: string
  register?: UseFormRegister<FieldValues>
  selectedValue?: string
}

const MenuOptionStyles = {
  borderRadius: "24px",
  border: "2px solid #D0CFCF",
  marginTop: "5px",
  "& .MuiMenuItem-root:active": {
    backgroundColor: "#D5E1FF",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#E8E8E8",
  },
}

type ItemProps = MenuItemProps & { value: string; label: string }

interface OptionsListProps {
  data?: ItemProps[]
  renderNoData?: () => ReactNode
}

const OptionsList: React.FC<OptionsListProps> = ({ data, renderNoData }) => {
  return (
    <>
      {data && data.length > 0
        ? data.map(element => (
            <MenuItem value={element.value} key={element.value}>
              {element.label}
            </MenuItem>
          ))
        : renderNoData?.()}
    </>
  )
}

export const Select = forwardRef<HTMLSelectElement, TProps>((props, ref) => {
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
  } = props

  const [preSelectedValue, setPreselectedValue] = useState<string>()

  const handleSelectChange = (e: SelectChangeEvent) => {
    onChange(e.target.value)
  }

  const renderValueFn = (selected: string) =>
    selected || <div className="text-basicGreyText">{placeholder}</div>

  useEffect(() => {
    if (value) {
      setPreselectedValue(
        () => data?.find(element => element.value === value)?.value
      )
    }
  }, [data, value])

  return (
    <label htmlFor={label} className={cn({ ["w-full"]: fullWidth })}>
      <Label label={label || ""} isRequired={isRequired} />

      <div style={{ marginBottom }} className="flex flex-col">
        <MUISelect
          displayEmpty
          ref={ref}
          labelId={label}
          error={!!error}
          defaultValue={preSelectedValue}
          onChange={handleSelectChange}
          value={value}
          sx={{
            ".css-1uwzc1h-MuiSelect-select-MuiInputBase-input:focus": {
              borderRadius: "24px",
            },
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
            "& .css-p7w5m5-MuiInputBase-root .Mui-error": {
              border: "none",
            },
          }}
          className={cn(`rounded-24px ${className}`, {
            ["w-full"]: fullWidth,
            ["border-error"]: !!error,
          })}
          input={<CustomInputBase />}
          id={label}
          renderValue={renderValueFn}
          MenuProps={{
            slotProps: {
              paper: {
                sx: MenuOptionStyles,
              },
            },
          }}
          placeholder={placeholder}
          {...register}
        >
          <OptionsList data={data} renderNoData={renderNoData} />
        </MUISelect>
        <FieldError error={error || ""} />
      </div>
    </label>
  )
})
