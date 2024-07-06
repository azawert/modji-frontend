import { CategoryDto } from "@/generated/categories"
import { useClickOutside } from "@/shared/hooks/hooks"
import { Icon } from "@/shared/ui/Icon/Icon"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Box, Card, Collapse, IconButton, Typography } from "@mui/material"
import { memo, useCallback, useState } from "react"

const defaultHeightOfCard = 180
/**
 * компонент чисто для карточки категории, потому что нужно показывать затемнение остального экрана кроме самой карточки, будет использоваться только в карточке, поэтому не выносил никуда
 * @prop isShown флаг для отображения компонента
 */
const DarkOverlay = ({ isShown }: { isShown: boolean }) => {
  if (!isShown) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
    />
  )
}

/** Пропы для карточки категории
 * 	@prop categoryData данные категории
 *  @prop handleOpenDeleteCategoryModal функция обработчик для открытия модального окна удаления категории
 * 	@prop handleOpenEditCategoryModal функция обработчик для открытия модального окна редактирования категории
 */
type TProps = {
  categoryData: CategoryDto
  handleOpenDeleteCategoryModal: (category: CategoryDto) => void
  handleOpenEditCategoryModal: (category: CategoryDto) => void
  needMargin?: boolean
}

export const CategoryCard: React.FC<TProps> = memo(props => {
  const {
    categoryData,
    handleOpenDeleteCategoryModal,
    handleOpenEditCategoryModal,
    needMargin,
  } = props
  const [isAdditionalFieldsShown, setIsAdditionalFieldsShown] =
    useState<boolean>(false)

  const handleToggleAdditionalFields = () => {
    setIsAdditionalFieldsShown(p => !p)
  }

  const handleCloseAdditionalFields = useCallback(() => {
    setIsAdditionalFieldsShown(false)
  }, [])
  const cardRef = useClickOutside(handleCloseAdditionalFields)

  const ButtonIcon = isAdditionalFieldsShown ? (
    <KeyboardArrowUp />
  ) : (
    <KeyboardArrowDown />
  )
  return (
    <>
      <DarkOverlay isShown={isAdditionalFieldsShown} />

      <Box
        sx={{
          position: "relative",
          width: "20%",
          marginRight: needMargin ? "16px" : undefined,
          marginBottom: "20px",
        }}
        ref={cardRef}
      >
        <Card
          sx={{
            padding: "32px 24px",
            borderRadius: "16px",
            boxShadow: "0px 4px 8px 0px #00000017",
            zIndex: isAdditionalFieldsShown ? 1000 : "auto",
            position: isAdditionalFieldsShown ? "absolute" : "static",
            width: "100%",
            height: isAdditionalFieldsShown ? undefined : defaultHeightOfCard,
          }}
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
              <Collapse
                in={isAdditionalFieldsShown}
                timeout="auto"
                unmountOnExit
              >
                {categoryData.description && (
                  <Typography fontSize={16} color="#181A1A">
                    {categoryData.description}
                  </Typography>
                )}
              </Collapse>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={() => handleOpenEditCategoryModal(categoryData)}
            >
              <Icon type={"EditIcon"} />
            </IconButton>
            <IconButton
              onClick={() => handleOpenDeleteCategoryModal(categoryData)}
            >
              <Icon type={"DeleteIcon"} />
            </IconButton>
          </Box>
        </Card>
      </Box>
    </>
  )
})
