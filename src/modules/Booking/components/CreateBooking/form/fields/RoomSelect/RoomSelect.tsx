import { SelectData } from "@/shared/ui/Select"
import { Typography } from "@mui/material"
import { BookingSelect } from "../BookingSelect/BookingSelect"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import { RoomDto } from "@/generated/room"

type TProps = {
  onChange: (value: string) => void
  value: string
  error?: string
  className?: string
  rooms: RoomDto[]
  disabled?: boolean
  isErrorRequest: boolean
}

export const RoomSelect: React.FC<TProps> = props => {
  const { onChange, value, error, className, rooms, isErrorRequest } = props

  const hasRooms = rooms.length
  const placeholder = !hasRooms
    ? "Нет доступных комнат"
    : Placeholder.ROOMS.valueOf()

  const mappedDataFromRooms = (): SelectData[] | undefined =>
    rooms?.map(element => ({
      label: element.number,
      value: String(element.number),
    }))

  const renderNoData = (): React.ReactNode => {
    if (!isErrorRequest && rooms?.length === 0) {
      return <Typography>Комнаты не найдены</Typography>
    } else if (isErrorRequest) {
      return <Typography>Ошибка загрузки комнат</Typography>
    }
  }

  return (
    <BookingSelect
      data={mappedDataFromRooms()}
      label={value.length ? "Комната*" : ""}
      onChange={onChange}
      value={String(value)}
      renderNoData={renderNoData}
      error={error}
      marginBottom="16px"
      placeholder={placeholder}
      className={className}
      disabled={!hasRooms}
    />
  )
}
