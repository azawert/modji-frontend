import {
  styled,
  alpha,
  SvgIcon,
  Autocomplete,
  TextField,
  debounce,
} from "@mui/material"
import { SvgIconProps } from "@mui/material/SvgIcon"
import { useState } from "react"
import { OwnerDto } from "@/generated/owners"

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "24px",
  backgroundColor: alpha(theme.palette.common.white, 1),
  border: "2px solid #D0CFCF",
  padding: "0 3px",
  marginTop: "-5px",
  width: "400px",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  outline: "none",
  "& .MuiAutocomplete-inputRoot": {
    padding: "1px 1px 1px 0",
    paddingLeft: theme.spacing(0),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  "& fieldset": { border: "none" },
}))

const SearchIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ width: 16, height: 16 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4136_1067)">
        <path
          d="M7.33333 13.6667C10.8311 13.6667 13.6667 10.8311 13.6667 7.33333C13.6667 3.83553 10.8311 1 7.33333 1C3.83553 1 1 3.83553 1 7.33333C1 10.8311 3.83553 13.6667 7.33333 13.6667Z"
          stroke="#181A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3333 14.3333L13 13"
          stroke="#181A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4136_1067">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </SvgIcon>
)

type TProps = {
  placeholder?: string
  completeOptions?: OwnerDto[]
  isLoading?: boolean
  search: string
  onSearchChange: (value: string) => void
}

export const SearchComponent: React.FC<TProps> = props => {
  const {
    placeholder,
    completeOptions = [],
    isLoading,
    search,
    onSearchChange,
  } = props

  const [open, setOpen] = useState(false)

  const handleDebounceInputChange = debounce((_, value) => {
    onSearchChange(value)
  }, 300)

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon width={"16px"} height={"16px"} />
      </SearchIconWrapper>

      <Autocomplete
        noOptionsText="Клиент не найден"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={option => (option as OwnerDto).firstName || ""}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={isLoading}
        loadingText="Поиск..."
        filterOptions={x => x}
        freeSolo={completeOptions?.length ? false : true}
        id="combo-box-demo"
        sx={{ width: 400 }}
        options={completeOptions}
        onInputChange={handleDebounceInputChange}
        renderInput={params => (
          <StyledInputBase
            {...params}
            value={search}
            placeholder={placeholder}
            variant="outlined"
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        )}
      />
    </Search>
  )
}
