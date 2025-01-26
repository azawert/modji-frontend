import { BookingDto } from "@/generated/bookings"
import { useEffect, useRef, useState } from "react"

/**
 * Пропсы для клетки с бронью
 * @param bookingInfo информация о брони
 * @param color цвет клетки
 * @param index индекс клетки
 * @param clientName имя клиента
 */
type TProps = {
  bookingInfo: {
    startIndex: number
    endIndex: number
    booking: BookingDto
  }
  color: "#A2E9FF" | "#FEE97E" | "#6EE38F" | "#EBAAFB" | undefined
  index: number
  clientName: string
}

export const BookingCell = ({
  bookingInfo,
  index,
  color,
  clientName,
}: TProps) => {
  const [displayName, setDisplayName] = useState(clientName)
  const textRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const isOverflowing =
        textRef.current.scrollWidth > containerRef.current.clientWidth
      if (isOverflowing) {
        let truncatedName = clientName
        while (
          textRef.current.scrollWidth > containerRef.current.clientWidth &&
          truncatedName.length > 0
        ) {
          truncatedName = truncatedName.slice(0, -1)
          textRef.current.textContent = truncatedName + "..."
        }
        setDisplayName(truncatedName + "...")
      }
    }
  }, [clientName])

  return (
    <div
      ref={containerRef}
      key={index}
      className={`absolute flex items-center justify-center rounded-[12px] overflow-hidden px-2`}
      style={{
        width:
          bookingInfo.startIndex === bookingInfo.endIndex
            ? "calc(100% - 4px)"
            : `calc(${
                (bookingInfo.endIndex - bookingInfo.startIndex) * 100
              }% + 2px)`,
        left:
          bookingInfo.startIndex === bookingInfo.endIndex ? "2px" : "calc(50%)",
        top: "5px",
        bottom: "5px",
        zIndex: "2",
        backgroundColor: color,
        right:
          bookingInfo.startIndex === bookingInfo.endIndex
            ? "-2px"
            : "calc(-50%)",
      }}
    >
      <span ref={textRef} className="whitespace-nowrap">
        {displayName}
      </span>
    </div>
  )
}
