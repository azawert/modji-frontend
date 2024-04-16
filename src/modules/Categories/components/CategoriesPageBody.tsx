import { CategoryDto } from "@/generated/categories"
import { Box, CircularProgress, Typography } from "@mui/material"
import { memo } from "react"
import { CategoryCard } from "./CategoryCard"

type TProps = {
  categories: CategoryDto[]
  isLoading: boolean
  handleOpenDeleteCategoryModal: (category: CategoryDto) => void
  handleOpenEditCategoryModal: (category: CategoryDto) => void
}

export const CategoriesPageBody: React.FC<TProps> = memo(props => {
  const {
    categories,
    handleOpenDeleteCategoryModal,
    handleOpenEditCategoryModal,
    isLoading,
  } = props

  return (
    <Box
      display="flex"
      justifyContent={
        isLoading || categories.length === 0 ? "center" : "flex-start"
      }
      alignItems={
        isLoading || categories.length === 0 ? "center" : "flex-start"
      }
      flexWrap="wrap"
    >
      {isLoading ? (
        <CircularProgress />
      ) : categories.length === 0 ? (
        <Typography color="#757575" fontSize={16} fontWeight={400}>
          Нет действующих категорий
        </Typography>
      ) : (
        (categories || []).map(category => (
          <CategoryCard
            categoryData={category}
            handleOpenDeleteCategoryModal={handleOpenDeleteCategoryModal}
            handleOpenEditCategoryModal={handleOpenEditCategoryModal}
            key={category.id}
            className="mr-5 mb-4"
          />
        ))
      )}
    </Box>
  )
})
