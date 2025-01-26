import { useGetCategories } from "@/modules/Categories/api/queries"
import { Select, SelectData } from "@/shared/ui/Select"
import { Typography } from "@mui/material"
import { ReactNode } from "react"

type TProps = {
  onChange: (value: string) => void
  value: string
  error?: string
  onBlur?: () => void
}

export const SelectWithCategories: React.FC<TProps> = props => {
  const { onChange, value, error, onBlur } = props
  const { data: categories, isError } = useGetCategories()

  const mappedDataFromCategories = (): SelectData[] | undefined =>
    categories?.map(element => ({
      label: element.name,
      value: String(element.id),
    }))
  const renderNoData = (): React.ReactNode => {
    if (!isError && categories?.length === 0) {
      return <Typography>Категории не найдены</Typography>
    } else if (isError) {
      return <Typography>Ошибка загрузки категорий</Typography>
    }
  }

  const renderValue = (value: string): ReactNode => {
    const category = categories?.find(element => String(element.id) === value)
    return category ? (
      category.name
    ) : (
      <Typography color="#757575">Категория*</Typography>
    )
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
      renderValue={renderValue}
      onBlur={onBlur}
    />
  )
}
