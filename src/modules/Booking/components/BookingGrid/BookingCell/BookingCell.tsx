import { useEffect, useRef, useState } from "react"

import { Tooltip } from "@mui/material"

import { mapBookingStatusToText } from "@/modules/Booking/model/utils"
import { getFullName } from "@/modules/Employee/utils"

import { BookingDto } from "@/generated/bookings"

import { TTabForHeader } from "../../../model/types/BookingGridTypes"
import { BookingTooltipCard } from "../BookingTooltipCard/BookingTooltipCard"

type BookingCellProps = {
  bookingInfo: {
    startIndex: number
    endIndex: number
    booking: BookingDto
  }
  color: "#A2E9FF" | "#FEE97E" | "#6EE38F" | "#EBAAFB" | undefined
  index: number
  clientName: string
  activeTabHeader: TTabForHeader
}

export const BookingCell = ({
  bookingInfo,
  color,
  clientName,
  activeTabHeader,
}: BookingCellProps) => {
  const [displayName, setDisplayName] = useState(clientName)
  const textRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isWeekTab = activeTabHeader.value === "week"
  // Рассчитываем ширину и позиционирование ячейки
  const isSingleDay = bookingInfo.startIndex === bookingInfo.endIndex
  const width = isSingleDay
    ? "calc(100% - 4px)"
    : `calc(${(bookingInfo.endIndex - bookingInfo.startIndex) * 100}% + 2px)`
  const left = isSingleDay ? "2px" : "calc(50%)"
  const right = isSingleDay ? "-2px" : "calc(-50%)"

  // Обрезаем имя, если оно не помещается
  useEffect(() => {
    const updateDisplayName = () => {
      if (!textRef.current || !containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      let truncatedName = clientName
      textRef.current.textContent = clientName

      if (textRef.current.scrollWidth > containerWidth) {
        while (
          textRef.current.scrollWidth > containerWidth &&
          truncatedName.length > 0
        ) {
          truncatedName = truncatedName.slice(0, -1)
          textRef.current.textContent = `${truncatedName}...`
        }
        setDisplayName(`${truncatedName}...`)
      } else {
        setDisplayName(clientName)
      }
    }

    updateDisplayName()

    // Добавляем обработчик ресайза для адаптивности
    const handleResize = () => updateDisplayName()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [clientName, isWeekTab]) // Добавляем isWeekView в зависимости

  const booking = bookingInfo.booking
  const pet = booking.pets?.[0]
  const owner = pet?.ownerShortDto

  const tooltipContent = (
    <BookingTooltipCard
      labelStatus={mapBookingStatusToText[booking.status]}
      clientName={getFullName(
        owner?.firstName || "",
        owner?.lastName,
        owner?.middleName,
      )}
      clientRating={owner?.rating?.toString() || ""}
      pet={pet}
      color={color}
      bookingSum={booking?.price?.toString() || "0"}
      checkInDate={`${booking.checkInDate} ${booking.checkInTime}`}
      checkOutDate={`${booking.checkOutDate} ${booking.checkOutTime}`}
    />
  )

  return (
    <Tooltip
      title={tooltipContent}
      arrow
      enterDelay={300}
      placement="top"
      componentsProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 12],
              },
            },
          ],
        },
        tooltip: {
          sx: {
            backgroundColor: "transparent",
            padding: 0,
            boxShadow: "none",
            borderRadius: 0,
            width: 339,
          },
        },
      }}
    >
      <div
        ref={containerRef}
        className="absolute flex items-center justify-center rounded-[12px] overflow-hidden px-2"
        style={{
          width,
          left,
          right,
          top: "5px",
          bottom: "5px",
          zIndex: 2,
          backgroundColor: color,
        }}
      >
        <span ref={textRef} className="whitespace-nowrap">
          {displayName}
        </span>
      </div>
    </Tooltip>
  )
}
