import { BookingDto } from "@/generated/bookings"
import { useEffect, useRef, useState } from "react"
import { TTabForHeader } from "../../../model/types/BookingGridTypes"

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

  return (
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
  )
}
