import { UserDto } from "@/generated/user"
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
import { getFullName, roleMapperForRussianLanguage } from "../utils"
import { Icon } from "@/shared/ui/Icon/Icon"
import { useCallback, useState } from "react"
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"

/**
 * @prop employee данные для отображения сотрудника
 * @prop onDeleteIconClick обработчик клика по иконке удаления
 * @prop onEditIconClick обработчик клика по иконке редактирования
 * @prop [isDeleteAvailable] флаг для отображения иконки удаления
 */
type TProps = {
  employee: UserDto
  onDeleteIconClick: (employee: UserDto) => void
  onEditIconClick: (employee: UserDto) => void
  isDeleteAvailable?: boolean
}

export const EmployeeRowItem: React.FC<TProps> = props => {
  const { employee, onDeleteIconClick, onEditIconClick, isDeleteAvailable } =
    props
  const [isAdditionalFieldsShown, setIsAdditionalFieldsShown] =
    useState<boolean>(false)

  const toggleAdditionalFields = useCallback(
    () => setIsAdditionalFieldsShown(p => !p),
    []
  )

  const handleIconButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toggleAdditionalFields()
  }, [])
  return (
    <>
      <TableRow
        hover
        sx={{
          "& .MuiTableRow-hover": {
            backgroundColor: "#F6F8FF",
            cursor: "pointer",
          },
        }}
        onClick={toggleAdditionalFields}
      >
        <TableCell>
          {getFullName(
            employee.firstName,
            employee.lastName,
            employee.middleName
          )}
        </TableCell>
        <TableCell>{roleMapperForRussianLanguage[employee.role]}</TableCell>
        <TableCell>
          <div className="flex justify-end">
            <IconButton onClick={() => onEditIconClick(employee)}>
              <Icon type={"EditIcon"} />
            </IconButton>
            {isDeleteAvailable && (
              <IconButton onClick={() => onDeleteIconClick(employee)}>
                <Icon type={"DeleteIcon"} />
              </IconButton>
            )}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleIconButtonClick}
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
                      Фамилия
                    </Typography>
                  </TableCell>
                  <TableCell width={"auto"}>
                    <Typography fontSize={16}>
                      {employee.lastName || ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"15%"}>
                    <Typography fontSize={16} fontWeight={700}>
                      Имя
                    </Typography>
                  </TableCell>
                  <TableCell width={"auto"}>
                    <Typography fontSize={16}>{employee.firstName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"15%"}>
                    <Typography fontSize={16} fontWeight={700}>
                      Отчество
                    </Typography>
                  </TableCell>
                  <TableCell width={"auto"}>
                    <Typography fontSize={16}>
                      {employee.middleName || ""}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"15%"}>
                    <Typography fontSize={16} fontWeight={700}>
                      Адрес электронной почты
                    </Typography>
                  </TableCell>
                  <TableCell width={"auto"}>
                    <Typography fontSize={16}>{employee.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"15%"}>
                    <Typography fontSize={16} fontWeight={700}>
                      Должность
                    </Typography>
                  </TableCell>
                  <TableCell width={"auto"}>
                    <Typography fontSize={16}>
                      {roleMapperForRussianLanguage[employee.role]}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"15%"}>
                    <Typography fontSize={16} fontWeight={700}>
                      Пароль
                    </Typography>
                  </TableCell>
                  <TableCell width={"auto"}>
                    <Typography fontSize={16}>{employee.password}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
