import { useGetCategories } from "@/modules/Categories/api/queries"
import { SelectData } from "@/shared/ui/Select"
import { Typography } from "@mui/material"
import { BookingSelect } from "../BookingSelect/BookingSelect"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"

type TProps = {
  onChange: (value: string) => void
  value: string
  error?: string
  className: string
}

export const CategorySelect: React.FC<TProps> = props => {
  const { onChange, value, error, className } = props
  const { data: categories, isError } = useGetCategories()

  const mappedDataFromCategories = (): SelectData[] | undefined =>
    categories?.data.map(element => ({
      label: element.name,
      value: String(element.name),
    }))
  const renderNoData = (): React.ReactNode => {
    if (!isError && categories?.data?.length === 0) {
      return <Typography>Категории не найдены</Typography>
    } else if (isError) {
      return <Typography>Ошибка загрузки категорий</Typography>
    }
  }

  return (
    <BookingSelect
      data={mappedDataFromCategories()}
      label={value?.length ? "Категория*" : ""}
      onChange={onChange}
      value={String(value)}
      renderNoData={renderNoData}
      error={error}
      fullWidth={!className}
      marginBottom="16px"
      placeholder={Placeholder.CATEGORIES.valueOf()}
      className={className}
    />
  )
}
