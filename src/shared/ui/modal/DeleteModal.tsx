import { Box, Dialog, DialogTitle } from "@mui/material"
import { memo } from "react"

/**
 * @prop isOpen флаг открытия модального окна
 * @prop renderHeader функция отрисовки хедера модального окна
 * @prop renderMainContent функция отрисовки основного контента
 * @prop renderFooter функция отрисовки футера модального окна
 * @prop renderSubText функция отрисовки подтекста основного контента
 * @prop onClose функция закрытия модального окна
 */
type TProps = {
  isOpen: boolean
  renderHeader: () => React.ReactNode
  renderMainContent: () => React.ReactNode
  renderFooter: () => React.ReactNode
  renderSubText: () => React.ReactNode
  onClose: () => void
  ariaDescribedby: string
  ariaLabelledby: string
}

/** Общий компонент модального окна удаления сущности */
export const DeleteModal: React.FC<TProps> = memo(props => {
  const {
    isOpen,
    renderFooter,
    renderHeader,
    renderMainContent,
    renderSubText,
    onClose,
    ariaDescribedby,
    ariaLabelledby,
  } = props
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      sx={{
        "& .MuiDialogTitle-root": {
          padding: 0,
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "616px",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="flex-end" padding="0">
        {renderHeader()}
      </DialogTitle>
      <div className="pb-10 px-16">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={"15px"}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
            width="100%"
          >
            {renderMainContent()}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#F6F8FF",
            borderRadius: "16px",
            padding: "16px 16px",
          }}
          marginBottom="40px"
        >
          {renderSubText()}
        </Box>
        <Box display={"flex"} marginTop="8px" justifyContent={"space-between"}>
          {renderFooter()}
        </Box>
      </div>
    </Dialog>
  )
})
