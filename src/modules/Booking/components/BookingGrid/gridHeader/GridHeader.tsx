import { useMemo } from "react"

import { Stack } from "@mui/material"

import { SearchComponent } from "@/shared/ui/SearchComponent"
import { Tab } from "@/shared/ui/Tab"

import { EBookingView } from "@/modules/Booking/model/types/BookingGridTypes"
import { HEADER_TABS } from "@/modules/Booking/model/utils"

import { BookingDto } from "@/generated/bookings"

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
    [selectedTab, onChangeTab],
  )
  return (
    <Stack display="flex" direction="row" justifyContent="space-between">
      <Stack direction={"row"} spacing={"8px"}>
        {tabs}
      </Stack>
      <Stack>
        <SearchComponent<BookingDto>
          completeOptions={[]}
          onSearchChange={onQueueChange}
          search={queue}
          optionName="price"
        />
      </Stack>
    </Stack>
  )
}
