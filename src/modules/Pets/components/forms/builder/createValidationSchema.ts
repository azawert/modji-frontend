import * as yup from "yup"
import { FormField } from "../types/types"

export const createValidationSchema = (fields: FormField[]) => {
  const schema: { [key: string]: yup.AnySchema } = {}

  fields.forEach(field => {
    let fieldSchema
    switch (field.type) {
      case "text":
        fieldSchema = yup.string()
        if (field.required) {
          fieldSchema = fieldSchema.required(
            field.validationErr || "This field is required"
          )
        }
        if (field.minLetters) {
          fieldSchema = fieldSchema.min(
            field.minLetters,
            `Minimum ${field.minLetters} letters`
          )
        }
        break
      case "date":
      case "select":
      case "radio":
        fieldSchema = yup.string()
        if (field.required) {
          fieldSchema = fieldSchema.required(
            field.validationErr || "This field is required"
          )
        }
        break
      case "checkbox":
        fieldSchema = yup.boolean()
        if (field.required) {
          fieldSchema = fieldSchema.oneOf(
            [true],
            field.validationErr || "This field is required"
          )
        }
        break
      default:
        break
    }
    if (fieldSchema) {
      schema[field.name] = fieldSchema
    }
  })

  return yup.object().shape(schema)
}
