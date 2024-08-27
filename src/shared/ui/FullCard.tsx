import { ICardFullProps } from "@/shared/types/types.ts"
import { Box } from "@mui/material"

export const FullCard = ({
  renderErrorState,
  renderHeader,
  renderNoData,
  renderMainContent,
}: ICardFullProps) => {
  if (renderNoData) {
    return renderNoData()
  }

  if (renderErrorState) {
    return renderErrorState()
  }

  return (
    <Box
      component="div"
      sx={{
        height: "384px",
        boxShadow: "0px 6px 12px 0px #0000001F",
        borderRadius: "0 0 8px 8px",
      }}
    >
      {renderHeader()}
      {renderMainContent()}
    </Box>
  )
}
