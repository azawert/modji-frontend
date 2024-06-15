import { useGetCategories } from "@/modules/Categories/api/queries"
import { Select, SelectData } from "@/shared/ui/Select"
import { Typography } from "@mui/material"

type TProps = {
  onChange: (value: string) => void
  value: string
  error?: string
}

export const SelectWithCategories: React.FC<TProps> = props => {
  const { onChange, value, error } = props
  const { data: categories, isError } = useGetCategories()

  const mappedDataFromCategories = (): SelectData[] | undefined =>
    categories?.data.map(element => ({
      label: element.name,
      value: String(element.id),
    }))
  const renderNoData = (): React.ReactNode => {
    if (!isError && categories?.data.length === 0) {
      return <Typography>Категории не найдены</Typography>
    } else if (isError) {
      return <Typography>Ошибка загрузки категорий</Typography>
    }
  }

  return (
    <Select
      data={mappedDataFromCategories()}
      label="Категория"
      onChange={onChange}
      selectedValue={String(value)}
      renderNoData={renderNoData}
      error={error}
      fullWidth
      marginBottom="16px"
      placeholder="Категория*"
      isRequired
    />
  )
}
