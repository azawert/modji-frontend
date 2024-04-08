import { UserDto, UserDtoRole } from "@/generated/user"
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
import { EmployeeRowItem } from "./EmployeeRowItem"

/**
 * @prop employees данные по сотрудникам для отображения в таблице
 * @prop [isLoading] флаг загрузки данных
 * @prop [isError] флаг наличия ошибки в загрузке данных
 */
type TProps = {
  employees: UserDto[]
  isLoading?: boolean
  isError?: boolean
  handleOpenDeleteModal: (employee: UserDto) => void
  handleOpenEditModal: (employee: UserDto) => void
}

export const EmployeePageBody: React.FC<TProps> = props => {
  const {
    employees,
    isLoading,
    isError,
    handleOpenDeleteModal,
    handleOpenEditModal,
  } = props

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-[#D5E1FF]">
            <TableRow>
              <TableCell width={"15%"}>
                <Typography fontSize={12}>Сотрудник</Typography>
              </TableCell>
              <TableCell width={"auto"}>
                <Typography fontSize={12}>Должность</Typography>
              </TableCell>
              <TableCell width={"9%"} />
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && !isError ? (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              (employees || []).map(employee => (
                <EmployeeRowItem
                  key={employee.id}
                  employee={employee}
                  isDeleteAvailable={employee.role !== UserDtoRole.ROLE_BOSS}
                  onDeleteIconClick={() => handleOpenDeleteModal(employee)}
                  onEditIconClick={() => handleOpenEditModal(employee)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
