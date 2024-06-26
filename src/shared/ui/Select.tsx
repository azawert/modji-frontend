import { cn } from "@/lib/utils"
import {
  InputBase,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
  styled,
} from "@mui/material"
import { useEffect, useState } from "react"

export type SelectData = {
  value: string
  label: string
}
type TProps = {
  onChange: (value: string) => void
  label: string
  selectedValue?: string
  error?: string
  fullWidth?: boolean
  isRequired?: boolean
  className?: string
  marginBottom?: string
  renderNoData?: () => React.ReactNode
  data?: SelectData[]
  placeholder?: string
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
  } = props
  const handleSelectChange = (e: SelectChangeEvent) => onChange(e.target.value)
  const [preSelectedValue, setPreselectedValue] = useState<string>()

  useEffect(() => {
    if (selectedValue) {
      setPreselectedValue(
        () => data?.find(element => element.value === selectedValue)?.value
      )
    }
  }, [data, selectedValue])
  return (
    <label htmlFor={label}>
      <span className="mb-1 text-sm text-basicGreyText active:border-basicBlack text-small">
        {label}
        <span className="font-semibold ml-0.5 text-basicGreyText ">
          {isRequired ? "*" : ""}
        </span>
      </span>
      <div style={{ marginBottom }}>
        <MUISelect
          labelId={label}
          error={!!error}
          onChange={handleSelectChange}
          defaultValue={preSelectedValue}
          value={selectedValue}
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
        >
          {Array.isArray(data)
            ? data?.map(element => {
                return (
                  <MenuItem value={element.value} key={element.value}>
                    {element.label}
                  </MenuItem>
                )
              })
            : renderNoData?.()}
        </MUISelect>
        {error && (
          <span className="text-error font-semibold text-small">{error}</span>
        )}
      </div>
    </label>
  )
}
