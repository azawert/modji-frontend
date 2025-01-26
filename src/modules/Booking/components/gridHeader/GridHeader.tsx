import { Stack } from "@mui/material"
import { EBookingView } from "../../model/types/BookingGridTypes"
import { HEADER_TABS } from "../../model/utils"
import { Tab } from "@/shared/ui/Tab"
import { SearchComponent } from "@/shared/ui/SearchComponent"
import { useMemo } from "react"

type TProps = {
  onChangeTab: (tab: EBookingView) => void
  selectedTab: EBookingView
  queue: string
  onQueueChange: (queue: string) => void
}

export const GridHeader = ({
  onChangeTab,
  selectedTab,
  onQueueChange,
  queue,
}: TProps) => {
  const tabs = useMemo(
    () =>
      HEADER_TABS.map(tab => (
        <Tab
          label={tab.label}
          onChangeTab={() => onChangeTab(tab.value)}
          isSelected={selectedTab === tab.value}
          key={tab.value}
        />
      )),
    [selectedTab, onChangeTab]
  )
  return (
    <Stack display="flex" direction="row" justifyContent="space-between">
      <Stack direction={"row"} spacing={"8px"}>
        {tabs}
      </Stack>
      <Stack>
        <SearchComponent onSearchChange={onQueueChange} search={queue} />
      </Stack>
    </Stack>
  )
}
