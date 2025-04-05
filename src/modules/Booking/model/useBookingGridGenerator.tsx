import { useMemo } from "react"

import { EBookingView, TBookingGridDay } from "./types/BookingGridTypes"
import {
  generateDaysForBookingGrid,
  generateWeekDaysForBookingGrid,
} from "./utils"

export const useBookingGridGenerator = (
  view: EBookingView,
): TBookingGridDay[] => {
  const generators: Record<EBookingView, () => TBookingGridDay[]> = {
    [EBookingView.WEEK]: generateWeekDaysForBookingGrid,
    [EBookingView.MONTH]: generateDaysForBookingGrid,
    [EBookingView.DAY]: generateDaysForBookingGrid,
    [EBookingView.THREE_MONTHS]: generateDaysForBookingGrid,
  }

  return useMemo(() => {
    const generator = generators[view]
    return generator ? generator() : []
  }, [view])
}
