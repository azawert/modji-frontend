import { Stack } from "@mui/material"
import { Tab } from "@/shared/ui/Tab"
import { useMemo } from "react"
import { HEADER_TABS } from "@/modules/Booking/model/utils"
import { EBookingView } from "@/modules/Booking/model/types/BookingGridTypes"
import { BookingSearchBar } from "../../BookingSearch/BookingSearchBar"

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
        <BookingSearchBar
          onSearchChange={onQueueChange}
          search={queue}
          placeholder="Введите ФИО, телефон или кличку питомца"
        />
      </Stack>
    </Stack>
  )
}
