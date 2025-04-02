import { Select, SelectData } from "@/shared/ui/Inputs/Select/Select"
import { Typography } from "@mui/material"
import { Placeholder } from "@/modules/Booking/consts/Placeholders"
import { CategoryDto } from "@/generated/bookings"

type TProps = {
  onChange: (value: string) => void
  onChangeCategory?: () => void
  value: string
  error?: string
  className: string
  isErrorRequest: boolean
  categories: CategoryDto[]
}

export const CategorySelect: React.FC<TProps> = props => {
  const { onChange, value, error, className, categories, isErrorRequest } =
    props
  const mappedDataFromCategories = (): SelectData[] | undefined =>
    categories?.map(element => ({
      label: element.name,
      value: String(element.name),
    }))
  const renderNoData = (): React.ReactNode => {
    if (!isErrorRequest && categories?.length === 0) {
      return <Typography>Категории не найдены</Typography>
    } else if (isErrorRequest) {
      return <Typography>Ошибка загрузки категорий</Typography>
    }
  }

  return (
    <Select
      data={mappedDataFromCategories()}
      label={value?.length ? "Категория*" : ""}
      onChange={onChange}
      value={value}
      renderNoData={renderNoData}
      error={error}
      fullWidth={!className}
      marginBottom="16px"
      placeholder={Placeholder.CATEGORIES.valueOf()}
      className={className}
    />
  )
}
