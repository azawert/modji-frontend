import { RoomDto } from "@/generated/room"
import { memo } from "react"
import { EPageMode } from "../pages/RoomsPage"
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { RoomRowItem } from "./RoomRowItem"

type TProps = {
  rooms: RoomDto[]
  mode: EPageMode
  handleOpenDeleteModal: (room: RoomDto) => void
  handleOpenEditModal: (room: RoomDto) => void
  handleBackFromArchive: (id: number) => void
  isLoading: boolean
}

export const RoomsPageBody: React.FC<TProps> = memo(props => {
  const {
    mode,
    rooms,
    handleBackFromArchive,
    handleOpenDeleteModal,
    handleOpenEditModal,
    isLoading,
  } = props
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          "& .MuiTableCell-root": {
            padding: "12px 24px",
          },
        }}
      >
        <Table>
          <TableHead className="bg-[#D5E1FF]">
            <TableRow>
              <TableCell width={"15%"}>
                <Typography fontSize={12}>Категория</Typography>
              </TableCell>
              <TableCell width={"auto"}>
                <Typography fontSize={12}>Номер комнаты</Typography>
              </TableCell>
              <TableCell width={"9%"} />
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography fontSize={16} color="#757575" className="py-7">
                    {mode === EPageMode.ACTIVE
                      ? "Нет действующих номеров"
                      : "Нет удаленных номеров"}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              (rooms || []).map(room => (
                <RoomRowItem
                  key={room.id}
                  room={room}
                  handleBackFromArchive={() => handleBackFromArchive(room.id)}
                  handleOpenDeleteModal={() => handleOpenDeleteModal(room)}
                  handleOpenEditModal={() => handleOpenEditModal(room)}
                  mode={mode}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
})
