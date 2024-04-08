import { cn } from "@/lib/utils"
import {
  InputBase,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
  styled,
} from "@mui/material"

export type SelectData = {
  value: string
  label: string
}
type TProps = {
  data: SelectData[]
  onChange: (value: string) => void
  label: string
  selectedValue?: string
  error?: string
  fullWidth?: boolean
  isRequired?: boolean
}

const CustomizedInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 24,
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "12px 20px 12px 20px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    marginTop: 0,
  },
  "&:focus": {
    borderRadius: 24,
  },
}))

export const Select: React.FC<TProps> = props => {
  const { data, label, onChange, selectedValue, error, fullWidth, isRequired } =
    props
  const handleSelectChange = (e: SelectChangeEvent) => onChange(e.target.value)
  return (
    <label htmlFor={label}>
      <span className="mb-1 text-sm text-basicGreyText active:border-basicBlack">
        {label}
        <span className="font-semibold ml-0.5 text-basicGreyText ">
          {isRequired ? "*" : ""}
        </span>
      </span>
      <MUISelect
        labelId={label + "Id"}
        error={!!error}
        onChange={handleSelectChange}
        value={selectedValue}
        className={cn("focus-within:border-basicBlack rounded-24px ", {
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
              },
            },
          },
        }}
      >
        {data.map(element => (
          <MenuItem value={element.value} key={element.value}>
            {element.label}
          </MenuItem>
        ))}
      </MUISelect>
      {error && (
        <span className="text-error font-semibold text-small">{error}</span>
      )}
    </label>
  )
}
