import { CategoryDto } from "@/generated/categories"
import { Icon } from "@/shared/ui/Icon/Icon"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Box, Card, Collapse, IconButton, Typography } from "@mui/material"
import { memo, useState } from "react"

/** Пропы для карточки категории
 * 	@prop categoryData данные категории
 *  @prop handleOpenDeleteCategoryModal функция обработчик для открытия модального окна удаления категории
 * 	@prop handleOpenEditCategoryModal функция обработчик для открытия модального окна редактирования категории
 */
type TProps = {
  categoryData: CategoryDto
  handleOpenDeleteCategoryModal: (category: CategoryDto) => void
  handleOpenEditCategoryModal: (category: CategoryDto) => void
  className?: string
}

export const CategoryCard: React.FC<TProps> = memo(props => {
  const {
    categoryData,
    handleOpenDeleteCategoryModal,
    handleOpenEditCategoryModal,
    className,
  } = props
  const [isAdditionalFieldsShown, setIsAdditionalFieldsShown] =
    useState<boolean>(false)

  const handleToggleAdditionalFields = () => {
    setIsAdditionalFieldsShown(p => !p)
  }

  const ButtonIcon = isAdditionalFieldsShown ? (
    <KeyboardArrowUp />
  ) : (
    <KeyboardArrowDown />
  )
  return (
    <Card
      sx={{
        width: "25%",
        padding: "32px 24px",
        borderRadius: "16px",
        boxShadow: "0px 4px 8px 0px #00000017",
        flex: "0 0 calc(20% - 16px)",
      }}
      className={className}
    >
      <Box display="flex" flexDirection="column">
        <Box>
          <Typography fontSize={12} fontWeight={400} color="#757575">
            Категория
          </Typography>
          <Typography fontSize={16} color="#181A1A">
            {categoryData.name}
          </Typography>
        </Box>

        <Box marginTop="12px">
          <Box display="flex" alignItems="center">
            <Typography fontSize={12} fontWeight={400} color="#757575">
              Описание
            </Typography>
            <IconButton
              sx={{ padding: 0, margin: 0 }}
              onClick={handleToggleAdditionalFields}
            >
              {ButtonIcon}
            </IconButton>
          </Box>
          <Collapse in={isAdditionalFieldsShown} timeout="auto" unmountOnExit>
            <Typography fontSize={16} color="#181A1A">
              {categoryData.description || "Описания нет :("}
            </Typography>
          </Collapse>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => handleOpenEditCategoryModal(categoryData)}>
          <Icon type={"EditIcon"} />
        </IconButton>
        <IconButton onClick={() => handleOpenDeleteCategoryModal(categoryData)}>
          <Icon type={"DeleteIcon"} />
        </IconButton>
      </Box>
    </Card>
  )
})
