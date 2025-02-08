import { OwnerDto } from "@/generated/owners"
import useBookingStore from "@/modules/Booking/store/BookingStore"
import { useGetSuggestedClients } from "@/modules/Clients/api/queries"
import { SearchComponent } from "@/shared/ui/SearchComponent"
import { useEffect, useState } from "react"

export interface IOwnersSearch {
  onChooseOption: (option: OwnerDto) => void
}

export const OwnersSearch = ({ onChooseOption }: IOwnersSearch) => {
  const [search, setSearch] = useState("")
  const {
    data: options,
    isLoading: isLoadingSuggestions,
    refetch,
  } = useGetSuggestedClients(search, "name")

  const owner = useBookingStore(state => state.owner)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    refetch()
  }

  useEffect(() => {
    if (owner && !search) {
      onChooseOption(owner)
    }
  }, [owner, onChooseOption, search])

  return (
    <SearchComponent<OwnerDto>
      onOptionClick={onChooseOption}
      placeholder="Поиск по ФИО или телефону"
      completeOptions={options as OwnerDto[]}
      search={search}
      isLoading={isLoadingSuggestions}
      onSearchChange={handleSearchChange}
      defaultValue={owner ?? undefined}
      optionName="firstName"
    />
  )
}
