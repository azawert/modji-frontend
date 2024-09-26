import { OwnerDto } from "@/generated/owners"
import { useGetSuggestedClients } from "@/modules/Clients/api/queries"
import { SearchComponent } from "@/shared/ui/SearchComponent"
import { useState } from "react"

export const OwnersSearch = () => {
  const [search, setSearch] = useState("")
  const {
    data: options,
    isLoading: isLoadingSuggestions,
    refetch,
  } = useGetSuggestedClients(search, "name")

  const handleSearchChange = (value: string) => {
    setSearch(value)
    refetch()
  }

  return (
    <SearchComponent
      placeholder="Поиск по ФИО или телефону"
      completeOptions={options as OwnerDto[]}
      search={search}
      isLoading={isLoadingSuggestions}
      onSearchChange={handleSearchChange}
    />
  )
}
