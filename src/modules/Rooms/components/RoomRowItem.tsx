import { RoomDto } from "@/generated/room"
import { memo, useState } from "react"
import { EPageMode } from "../pages/RoomsPage"
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material"
import { Icon } from "@/shared/ui/Icon/Icon"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { renderValueWithPostfix } from "@/shared/utils/utils"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"

type TProps = {
  room: RoomDto
  mode: EPageMode
  handleOpenEditModal: () => void
  handleOpenDeleteModal: () => void
  handleBackFromArchive: () => void
}

export const RoomRowItem: React.FC<TProps> = memo(props => {
  const {
    handleBackFromArchive,
    handleOpenDeleteModal,
    handleOpenEditModal,
    mode,
    room,
  } = props

  const [isAdditionalFieldsShown, setIsAdditionalFieldsShown] =
    useState<boolean>(false)
  const isDeletedPagesShown = mode === EPageMode.DELETED
  //todo после правок от бека убрать тс игнор
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const categoryName = room.categoryDto?.name
  return (
    <>
      <TableRow
        hover
        sx={{
          "& .MuiTableRow-hover": {
            backgroundColor: "#F6F8FF",
          },
        }}
      >
        <TableCell>{categoryName}</TableCell>
        <TableCell>{room.number}</TableCell>
        <TableCell>
          <div className="flex gap-2">
            {isDeletedPagesShown ? (
              <Button
                variant={EButtonVariant.Secondary}
                size={EButtonSize.Small}
                onClick={handleBackFromArchive}
              >
                Восстановить
              </Button>
            ) : (
              <>
                <IconButton
                  onClick={handleOpenEditModal}
                  sx={{ margin: 0, padding: 0 }}
                >
                  <Icon type={"EditIcon"} />
                </IconButton>

                <IconButton
                  onClick={handleOpenDeleteModal}
                  sx={{ margin: 0, padding: 0 }}
                >
                  <Icon type={"DeleteIcon"} />
                </IconButton>
              </>
            )}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsAdditionalFieldsShown(p => !p)}
            >
              {isAdditionalFieldsShown ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )}
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      {isAdditionalFieldsShown && (
        <TableRow sx={{ border: 0 }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={isAdditionalFieldsShown} timeout="auto" unmountOnExit>
              <Table
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                    paddingLeft: 0,
                  },
                }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Typography fontSize={16} fontWeight={700}>
                        Площадь
                      </Typography>
                    </TableCell>
                    <TableCell width={"auto"}>
                      <Typography fontSize={16}>
                        {renderValueWithPostfix(room.area, " м2")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {room.description && (
                    <TableRow>
                      <TableCell width={"15%"}>
                        <Typography fontSize={16} fontWeight={700}>
                          Описание
                        </Typography>
                      </TableCell>
                      <TableCell width={"auto"}>
                        <Typography fontSize={16}>
                          {room.description}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
})
