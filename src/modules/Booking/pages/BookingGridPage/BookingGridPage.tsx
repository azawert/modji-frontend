import { FC, useCallback, useState } from "react"
import { useGetBookings } from "../../api/queries"
import {
  generateDaysForBookingGrid,
  getBookingInfo,
  getFirstDateForBookingGridRequest,
  getRoomsProperType,
  HEADER_TABS,
  mapBookingStatusToColor,
} from "../../model/utils"
import {
  EBookingView,
  TBookingGridDay,
  TTabForHeader,
} from "../../model/types/BookingGridTypes"
import { GridHeader } from "../../components/gridHeader/GridHeader"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import { BookingDtoStatus } from "@/generated/bookings"
import { getFullName } from "@/modules/Employee/utils"
import { useGetAllRooms } from "@/modules/Rooms/api/queries"
import { EPageMode } from "@/modules/Rooms/pages/RoomsPage"
import { BookingCell } from "../../components/BookingCell/BookingCell"
import { CircularProgress } from "@mui/material"

const generateWeekDaysForBookingGrid = (): TBookingGridDay[] => {
  const days: TBookingGridDay[] = []
  const today = dayjs()

  const startOfWeek = today.startOf("week")

  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.add(i, "day")
    days.push({
      day,
      isWeekend: i === 5 || i === 6,
      isToday: day.isSame(today, "day"),
    })
  }

  return days
}

const getLastDateForBookingGridRequest = (view: EBookingView): string => {
  switch (view) {
    case EBookingView.DAY:
      return dayjs().add(1, "day").format("YYYY-MM-DD")
    case EBookingView.WEEK:
      return dayjs().endOf("week").format("YYYY-MM-DD")
    case EBookingView.MONTH:
      return dayjs().endOf("month").format("YYYY-MM-DD")
    case EBookingView.THREE_MONTHS:
      return dayjs().add(3, "month").endOf("month").format("YYYY-MM-DD")
    default:
      return dayjs().add(1, "day").format("YYYY-MM-DD")
  }
}

export const BookingGridPage: FC = () => {
  const [activeTabHeader, setActiveTabHeader] = useState<TTabForHeader>(
    HEADER_TABS[0]
  )
  const [queue, setQueue] = useState<string>("")

  const handleTabChange = useCallback((tab: EBookingView) => {
    const selected = HEADER_TABS.find(el => el.value === tab)
    setActiveTabHeader(selected ?? HEADER_TABS[0])
  }, [])

  const daysForBookingGrid =
    activeTabHeader.value === EBookingView.WEEK
      ? generateWeekDaysForBookingGrid()
      : generateDaysForBookingGrid()

  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetBookings({
    startDate: getFirstDateForBookingGridRequest(),
    endDate: getLastDateForBookingGridRequest(activeTabHeader.value),
  })

  const { data: rooms } = useGetAllRooms(EPageMode.ACTIVE)

  const todayIndex = daysForBookingGrid.findIndex(day =>
    day.day.isSame(dayjs(), "day")
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div className="text-red-500">Error not handled.</div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden py-6">
      <div className="overflow-x-auto">
        <div className="py-4 px-6">
          <GridHeader
            onChangeTab={handleTabChange}
            onQueueChange={setQueue}
            queue={queue}
            selectedTab={activeTabHeader.value}
          />
        </div>
        <table className="table-fixed w-full">
          <thead className="relative">
            <tr>
              <th className="w-1/5 bg-[#F6F8FF] text-left p-2 text-[#585858]">
                Номера
              </th>
              {daysForBookingGrid.map(({ day, isWeekend }) => (
                <th
                  key={day.format("DD-MM-YYYY")}
                  className={`border p-2 ${isWeekend ? "bg-red-100" : ""}`}
                >
                  <div className="text-center">
                    <span>{day.format("DD")}</span>
                    <div
                      className="text-sm text-gray-500"
                      style={{ fontWeight: 400 }}
                    >
                      {day.format("dd")}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="relative overflow-x-auto overflow-y-auto">
          <table className="table-fixed w-full">
            <tbody>
              {getRoomsProperType(rooms || []).map((room, trIdx) => {
                const bookingsForRoom = bookings?.filter(
                  booking => booking.room.id === room.roomId
                )
                return (
                  <tr key={room.roomId}>
                    <td className="w-1/5 border p-2 text-left bg-[#F6F8FF]">
                      <div className="flex">
                        <div className="font-bold">{room.number}</div>
                        <div className="text-sm text-gray-500">
                          {room.category}
                        </div>
                      </div>
                    </td>
                    {daysForBookingGrid.map(({ isWeekend, day }, index) => {
                      const bookingInfos = getBookingInfo(
                        bookingsForRoom || [],
                        day,
                        daysForBookingGrid
                      )
                      return (
                        <td
                          key={index}
                          className={cn(
                            "border p-2 border-t-0 text-center relative",
                            {
                              "bg-red-100": isWeekend,
                            }
                          )}
                        >
                          {todayIndex === index && (
                            <div className="absolute inset-0">
                              <div
                                className={cn(
                                  "today-line absolute w-[2px] h-full bg-blue-500 left-1/2 z-10",
                                  { "with-circle": trIdx === 0 }
                                )}
                              />
                            </div>
                          )}
                          {bookingInfos.map((bookingInfo, bookingIndex) => {
                            const showBookingDiv =
                              index >= bookingInfo.startIndex &&
                              index <= bookingInfo.endIndex
                            const color =
                              mapBookingStatusToColor[
                                bookingInfo.booking.status ??
                                  BookingDtoStatus.STATUS_INITIAL
                              ]
                            const clientName = getFullName(
                              bookingInfo.booking?.pets?.[0]?.ownerShortDto
                                ?.firstName || "",
                              bookingInfo.booking?.pets?.[0]?.ownerShortDto
                                ?.lastName,
                              bookingInfo.booking?.pets?.[0]?.ownerShortDto
                                ?.middleName
                            )
                            if (
                              showBookingDiv &&
                              index === bookingInfo.startIndex
                            ) {
                              return (
                                <BookingCell
                                  key={`${room.roomId}-${bookingIndex}`}
                                  bookingInfo={bookingInfo}
                                  index={bookingIndex}
                                  color={color}
                                  clientName={clientName}
                                  activeTabHeader={activeTabHeader}
                                />
                              )
                            }
                            return null
                          })}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
