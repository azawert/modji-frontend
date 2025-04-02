import { OwnerDto } from "@/generated/owners.ts"
import { TableComponent } from "@/shared/ui/TableComponent.tsx"
import { Box } from "@mui/material"

import { ERROR_MESSAGES } from "@/shared/constants/errors.ts"
import { Pet } from "../../types.ts"
import { useClientTableRows } from "../../hooks/useClientTableRows.tsx"

interface IProps {
  isLoading: boolean
  isError: boolean
  data: OwnerDto[]
  error: Error | null
}

interface Client {
  fullName: string
  mainPhone?: string
  optionalPhone?: string
  registrationDate?: string
  id: string
}

export interface ClientData {
  client: Client
  pets: Pet[]
}

const columns = [
  { id: "client", label: "Данные клиента", width: 312 },
  { id: "pets", label: "Данные питомцев", flex: 1 },
]

const getErrorMessage = (error: Error | null): string | null => {
  if (!error) return null
  const matchedError = Object.keys(ERROR_MESSAGES).find(code =>
    error.message.includes(code)
  )
  return matchedError ? ERROR_MESSAGES[matchedError] : "Неизвестная ошибка"
}

export const TableWithClients: React.FC<IProps> = ({
  data,
  isLoading,
  isError,
  error,
}) => {
  const rows = useClientTableRows(data)

  return (
    <Box>
      <TableComponent
        columns={columns}
        rows={isLoading || isError ? [] : rows}
      />
      {isLoading && <div className="flex justify-center m-40">Загрузка...</div>}
      {isError && error && (
        <div className="flex justify-center m-40">{getErrorMessage(error)}</div>
      )}
    </Box>
  )
}
