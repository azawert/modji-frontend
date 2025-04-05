import { cn } from "@/lib/utils"

import { FormField } from "../types/types"

const typeHasWidth = (field: FormField) =>
  field.type === "text" || field.type === "date" || field.type === "select"

const widthMap = {
  "1/3": 1 / 3,
  "1/2": 1 / 2,
  full: 1,
}

export const groupFieldsByRows = (fields: FormField[]) => {
  const rows: FormField[][] = []
  let currentRow: FormField[] = []
  let currentWidth = 0

  if (fields.length === 0) {
    return rows
  }

  fields.forEach(field => {
    const fieldWidth = typeHasWidth(field) ? widthMap[field.width] : 0

    if (fieldWidth === 0) {
      if (currentRow.length > 0) {
        rows.push(currentRow)
        currentRow = []
        currentWidth = 0
      }
      rows.push([field])
    } else {
      if (currentWidth + fieldWidth > 1) {
        rows.push(currentRow)
        currentRow = [field]
        currentWidth = fieldWidth
      } else {
        currentRow.push(field)
        currentWidth += fieldWidth
      }
    }
  })

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

const WidthStyleMap = {
  "1/3": "w-1/3",
  "1/2": "w-1/2",
  full: "w-full",
}

export const renderFields = (
  fields: FormField[],
  renderField: (field: FormField) => JSX.Element,
) => {
  const rows = groupFieldsByRows(fields)

  const classNames = (field: FormField) => {
    if (!typeHasWidth(field)) return

    return cn(WidthStyleMap[field.width])
  }

  return rows.map((row, rowIndex) => (
    <div
      key={rowIndex}
      className="flex gap-3 items-end max-w-7xl"
      style={{ maxWidth: "700px" }}
    >
      {row.map(field => (
        <div key={field.id} className={classNames(field)}>
          {renderField(field)}
        </div>
      ))}
    </div>
  ))
}
