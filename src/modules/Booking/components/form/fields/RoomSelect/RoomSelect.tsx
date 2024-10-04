import { SelectData } from "@/shared/ui/Select"
import { Typography } from "@mui/material"
import { BookingSelect } from "../BookingSelect/BookingSelect"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import { useGetAllRooms } from "@/modules/Rooms/api/queries"

type TProps = {
  onChange: (value: string) => void
  value: string
  error?: string
  className?: string
}

export const RoomSelect: React.FC<TProps> = props => {
  const { onChange, value, error, className } = props
  const { data: rooms, isError } = useGetAllRooms("1")

  const mappedDataFromRooms = (): SelectData[] | undefined =>
    rooms?.map(element => ({
      label: element.number,
      value: String(element.number),
    }))
  const renderNoData = (): React.ReactNode => {
    if (!isError && rooms?.length === 0) {
      return <Typography>Комнаты не найдены</Typography>
    } else if (isError) {
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
      placeholder={Placeholder.ROOMS.valueOf()}
      className={className}
    />
  )
}
