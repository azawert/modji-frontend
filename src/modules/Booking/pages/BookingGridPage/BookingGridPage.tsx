import { FC, useCallback, useState } from "react"
import { useGetBookings } from "../../api/queries"
import {
  bookings,
  generateDaysForBookingGrid,
  getFirstDateForBookingGridRequest,
  getLastDateForBookingGridRequest,
  HEADER_TABS,
  isBetween,
} from "../../model/utils"
import {
  EBookingView,
  TBookingGridDay,
  TTabForHeader,
} from "../../model/types/BookingGridTypes"
import { GridHeader } from "../../components/gridHeader/GridHeader"
import { cn } from "@/lib/utils"
import { DATE_FRONT_FORMAT } from "@/widgets/DatePicker/types"
import dayjs from "dayjs"
import { BookingDto } from "@/generated/bookings"

const rooms: { id: number; category: string }[] = bookings.map(el => ({
  id: el.room.id,
  category: el.room.categoryDto?.name,
}))

const isDateWithinBooking = (
  date: string,
  checkInDate: string,
  checkOutDate: string
) => {
  return isBetween(date, checkInDate, checkOutDate, "[]")
}

const getBookingInfo = (
  bookingsForRoom: BookingDto[],
  currentDay: dayjs.Dayjs,
  daysForBookingGrid: TBookingGridDay[]
) => {
  const booking = bookingsForRoom.find(booking =>
    isDateWithinBooking(
      currentDay.format("DD.MM.YYYY"),
      booking.checkInDate,
      booking.checkOutDate
    )
  )

  if (booking) {
    const startIndex = daysForBookingGrid.findIndex(
      d => d.day.format(DATE_FRONT_FORMAT) === booking.checkInDate
    )
    const endIndex = daysForBookingGrid.findIndex(
      d => d.day.format(DATE_FRONT_FORMAT) === booking.checkOutDate
    )
    return { booking, startIndex, endIndex }
  }

  return null
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

  const { isLoading, isError } = useGetBookings({
    startDate: getFirstDateForBookingGridRequest(),
    endDate: getLastDateForBookingGridRequest(activeTabHeader.value),
  })

  const daysForBookingGrid = generateDaysForBookingGrid()

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
          <thead>
            <tr>
              <th className="w-1/5 bg-gray-100 text-left p-2">Категории</th>
              {daysForBookingGrid.map(({ day, isWeekend }) => (
                <th
                  key={day.format("DD-MM-YYYY")}
                  className={`border p-2 ${isWeekend ? "bg-red-100" : ""}`}
                >
                  <div className="text-center">
                    <span>{day.format("DD")}</span>
                    <div
                      className="text-sm text-gray-500"
                      style={{
                        fontWeight: 400,
                      }}
                    >
                      {day.format("dd")}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Таблица с комнатами */}
      <div className="relative overflow-x-auto overflow-y-auto">
        <table className="table-fixed w-full">
          <tbody>
            {rooms.map(room => {
              const bookingsForRoom = bookings.filter(
                booking => booking.room.id === room.id
              )
              return (
                <tr key={room.id}>
                  <td className="w-1/5 border p-2 text-left">
                    <div className="font-bold">{room.id}</div>
                    <div className="text-sm text-gray-500">{room.category}</div>
                  </td>

                  {daysForBookingGrid.map(({ isWeekend, day }, index) => {
                    const bookingInfo = getBookingInfo(
                      bookingsForRoom,
                      day,
                      daysForBookingGrid
                    )
                    const showBookingDiv =
                      bookingInfo &&
                      index >= bookingInfo.startIndex &&
                      index <= bookingInfo.endIndex

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
                        {showBookingDiv && index === bookingInfo.startIndex && (
                          <div
                            className="absolute left-0 top-0 right-0 bottom-0 bg-blue-200 flex items-center justify-center"
                            style={{
                              width: `${
                                (bookingInfo.endIndex -
                                  bookingInfo.startIndex) *
                                100
                              }%`,
                              left:
                                index === bookingInfo.startIndex ? "0" : "-1px",
                              right:
                                index === bookingInfo.endIndex ? "0" : "-1px",
                              top: "12px",
                              bottom: "12px",
                              zIndex: "2",
                            }}
                          >
                            1
                          </div>
                        )}
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
  )
}
