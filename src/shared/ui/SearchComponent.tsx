import { useState } from "react"

import { Autocomplete, TextField, alpha, debounce, styled } from "@mui/material"

import { Icon } from "./Icon/Icon"

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

type TProps<T extends { id: number }> = {
  onOptionClick?: (value: T) => void
  placeholder?: string
  completeOptions: T[]
  isLoading?: boolean
  search: string
  onSearchChange: (value: string) => void
  defaultValue?: T
  optionName?: keyof T
}

export const SearchComponent = <T extends { id: number }>(props: TProps<T>) => {
  const {
    placeholder,
    completeOptions = [],
    isLoading,
    search,
    onSearchChange,
    onOptionClick,
    defaultValue,
    optionName,
  } = props

  const [open, setOpen] = useState(false)

  const handleDebounceInputChange = debounce((_, value: string) => {
    onSearchChange(value)
  }, 300)

  return (
    <Search>
      <SearchIconWrapper>
        <Icon type="SearchIcon" width="16px" height="16px" />
      </SearchIconWrapper>

      <Autocomplete
        noOptionsText="Клиент не найден"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={option => {
          if (
            optionName &&
            typeof option !== "string" &&
            optionName in option
          ) {
            return String(option[optionName])
          }
          return ""
        }}
        value={defaultValue ?? null}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={isLoading}
        loadingText="Поиск..."
        filterOptions={x => x}
        freeSolo={completeOptions.length === 0}
        id="combo-box-demo"
        sx={{ width: 340 }}
        className="w-80 h-10 p-0"
        options={completeOptions}
        onChange={(_, value) => onOptionClick?.(value as T)}
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
