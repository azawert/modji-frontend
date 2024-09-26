import React, { forwardRef, useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import { IDateRange, TCalendarView, TDatePickerProps, months } from "./types"
import { cn } from "@/lib/utils"
import {
  checkIsDateIsBetween,
  isDateInSelectedMonth,
  transformFirstLetterToUpperCase,
  updateRange,
} from "./utils"
import { Icon } from "@/shared/ui/Icon/Icon"
import { useClickOutside } from "@/shared/hooks/useClickOutside"

dayjs.locale("ru")

export const DatePicker: React.FC<TDatePickerProps> = forwardRef<
  HTMLDivElement,
  TDatePickerProps
>(
  ({
    isOpen,
    onChange,
    value,
    disableFutureDates,
    disablePastDates,
    minDate,
    isRange,
    onClose,
    rangeValue,
    onChangeRange,
    cls,
    maxDate,
  }) => {
    const pickerRef = useClickOutside<HTMLDivElement>(() => {
      onClose()
    })

    const getUnit = (unit: Omit<TCalendarView, "day">) => {
      if (unit === "month") {
        if (isRange && rangeValue?.start) {
          return rangeValue.start.month()
        } else if (!isRange && value) {
          return value.month()
        } else {
          return dayjs().month()
        }
      } else {
        if (isRange && rangeValue?.start) {
          return rangeValue.start.year()
        } else if (!isRange && value) {
          return value.year()
        } else {
          return dayjs().year()
        }
      }
    }
    const [selectedDate, setSelectedDate] = useState<
      dayjs.Dayjs | null | undefined
    >(value)
    const [currentMonth, setCurrentMonth] = useState(getUnit("month"))
    const [currentYear, setCurrentYear] = useState(getUnit("year"))
    const [calendarView, setCalendarView] = useState<TCalendarView>("day")
    const [range, setRange] = useState<IDateRange | null>({
      start: rangeValue?.start || null,
      end: rangeValue?.end || null,
    })
    const today = dayjs()

    const startOfMonth = dayjs(new Date(currentYear, currentMonth)).startOf(
      "month"
    )
    const endOfMonth = dayjs(new Date(currentYear, currentMonth)).endOf("month")

    const startDay = startOfMonth.startOf("week")
    const endDay = endOfMonth.endOf("week")

    const handleClick = (date: dayjs.Dayjs) => {
      if (disableFutureDates && date.isAfter(today)) return
      if (disablePastDates && date.isBefore(today)) return
      if (minDate && date.isBefore(minDate)) return
      if (maxDate && date.isAfter(maxDate)) return
      const newRange = isRange && updateRange(date, range)
      if (newRange) {
        setRange(newRange)
        onChangeRange?.(newRange)
      }
      if (!isRange) {
        setSelectedDate(date)
        onChange?.(date)
      }
    }

    const handleOkButtonClick = () => {
      if (!selectedDate && !range) return
      isRange ? onChangeRange?.(range!) : onChange?.(selectedDate!)
      onClose()
    }

    const handleCancelButtonClick = () => {
      if (calendarView === "month" || calendarView === "year") {
        setCalendarView("day")
        return
      } else {
        setSelectedDate(undefined)
        setRange(null)
        onClose()
      }
    }

    const handleArrowClick = (
      unit: Omit<TCalendarView, "day">,
      isIncrement: boolean
    ) => {
      unit === "year"
        ? setCurrentYear(prev => (isIncrement ? prev + 1 : prev - 1))
        : setCurrentMonth(prev => (isIncrement ? prev + 1 : prev - 1))
    }

    const generateCalendar = () => {
      const days: dayjs.Dayjs[] = []
      let currentDay = startDay

      while (currentDay.isBefore(endDay) || currentDay.isSame(endDay, "day")) {
        days.push(currentDay)
        currentDay = currentDay.add(1, "day")
      }

      return days
    }

    const calendarDays = generateCalendar()

    const handleMonthChange = (month: number) => {
      setCurrentMonth(month)
      setCalendarView("day")
    }

    const handleYearChange = (year: number) => {
      setCurrentYear(year)
      setCalendarView("month")
    }

    const renderMonthPicker = () => {
      return (
        <div className="bg-white rounded-[10px] p-[10px] z-50 max-h-[200px] overflow-y-auto w-full">
          {months.map((month, index) => (
            <div
              key={month}
              onClick={() => handleMonthChange(index)}
              className={cn({
                ["rounded-[24px] bg-[#E8E8E8]"]: index === currentMonth,
                ["p-[10px] text-center cursor-pointer"]: true,
              })}
            >
              {month}
            </div>
          ))}
        </div>
      )
    }

    const renderYearPicker = () => {
      const years = Array.from({ length: 10 }, (_, i) => today.year() - 5 + i)
      return (
        <div className="bg-white rounded-[10px] p-[10px] z-50 max-h-[200px] overflow-y-auto w-full">
          {years.map(year => (
            <div
              key={year}
              onClick={() => handleYearChange(year)}
              className={cn({
                ["rounded-[24px] bg-[#E8E8E8]"]: year === currentYear,
                ["p-[10px] text-center cursor-pointer"]: true,
              })}
            >
              {year}
            </div>
          ))}
        </div>
      )
    }

    const renderDayPicker = () => (
      <>
        <div className="px-[10px] flex flex-wrap">
          <div className="flex w-full justify-between py-[10px]">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(day => (
              <div className="text-[12px] text-center w-[48px]" key={day}>
                {day}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {calendarDays.map(day => {
              return (
                <div
                  key={day.toString()}
                  onClick={() => handleClick(day)}
                  className={cn({
                    ["bg-[#1170FF] text-white rounded-[50px]"]:
                      (!isRange && day.isSame(selectedDate, "day")) ||
                      day.isSame(range?.start, "day") ||
                      day.isSame(range?.end, "day"),
                    ["bg-[#D5E1FF]"]:
                      range?.start &&
                      checkIsDateIsBetween(day, range?.start, range?.end),
                    ["text-[#D0CFCF]"]:
                      (disableFutureDates && day.isAfter(today)) ||
                      (disablePastDates && day.isBefore(today)) ||
                      (minDate && day.isBefore(minDate)) ||
                      (maxDate && day.isAfter(maxDate)),
                    ["text-[#757575]"]:
                      !isDateInSelectedMonth(day, currentMonth) &&
                      !day.isAfter(today) &&
                      !day.isSame(selectedDate, "day"),
                    ["w-[30px] h-[30px] text-center leading-[30px] m-[2px]"]:
                      true,
                    ["cursor-not-allowed"]:
                      (disableFutureDates && day.isAfter(today)) ||
                      (disablePastDates && day.isBefore(today)) ||
                      (minDate && day.isBefore(minDate)) ||
                      (maxDate && day.isAfter(maxDate)),
                    ["cursor-pointer"]: !minDate || !day.isBefore(minDate),
                  })}
                >
                  {day.date()}
                </div>
              )
            })}
          </div>
        </div>
      </>
    )

    return (
      isOpen && (
        <div className={cls} ref={pickerRef}>
          <div style={styles.calendar}>
            <div style={styles.header}>
              <div className="flex gap-2">
                <Icon
                  type={"LeftArrowIcon"}
                  onClick={() => handleArrowClick("month", false)}
                  className={cn({
                    ["cursor-pointer"]: true,
                    ["opacity-0"]: calendarView === "year",
                  })}
                />

                <span
                  className={cn({
                    ["text-[#D0CFCF]"]: calendarView === "year",
                    ["cursor-pointer"]:
                      calendarView === "month" || calendarView === "day",
                    ["text-[#585858]"]: calendarView === "day",
                    ["text-[14px]"]: true,
                  })}
                  onClick={() => {
                    if (calendarView === "year") return
                    setCalendarView("month")
                  }}
                >
                  {transformFirstLetterToUpperCase(
                    dayjs(new Date(currentYear, currentMonth)).format("MMMM")
                  )}
                </span>

                <Icon
                  type={"RightArrowIcon"}
                  onClick={() => handleArrowClick("month", true)}
                  className={cn({
                    ["cursor-pointer"]: true,
                    ["opacity-0"]: calendarView === "year",
                  })}
                />
              </div>
              <div className="flex gap-2">
                <Icon
                  type={"LeftArrowIcon"}
                  onClick={() => handleArrowClick("year", false)}
                  className={cn({
                    ["cursor-pointer"]: true,
                    ["opacity-0"]: calendarView === "month",
                  })}
                />
                <span
                  onClick={() => {
                    if (calendarView === "month") return
                    setCalendarView("year")
                  }}
                  className={cn({
                    ["text-[#D0CFCF]"]: calendarView === "month",
                    ["cursor-pointer"]:
                      calendarView === "year" || calendarView === "day",
                    ["text-[#585858]"]: calendarView === "day",
                    ["text-[14px]"]: true,
                  })}
                >
                  {currentYear}
                </span>
                <Icon
                  type={"RightArrowIcon"}
                  onClick={() => handleArrowClick("year", true)}
                  className={cn({
                    ["cursor-pointer"]: true,
                    ["opacity-0"]: calendarView === "month",
                  })}
                />
              </div>
            </div>
            {calendarView === "day" && renderDayPicker()}
            {calendarView === "month" && renderMonthPicker()}
            {calendarView === "year" && renderYearPicker()}
            <div className="flex justify-end gap-5 px-3 py-[18px]">
              <button
                onClick={handleCancelButtonClick}
                className="text-medium text-[#757575] cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleOkButtonClick}
                className="text-[#1170FF] text-medium font-[500] cursor-pointer"
              >
                ОК
              </button>
            </div>
          </div>
        </div>
      )
    )
  }
)

const styles = {
  calendar: {
    border: "2px solid #D0CFCF",
    borderRadius: "24px",
    width: "280px",
    zIndex: 1000,
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#F6F8FF",
    border: "transparent",
    borderRadius: "24px 24px 0 0",
  },
}
