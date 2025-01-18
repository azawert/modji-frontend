import { useForm, Controller, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createValidationSchema } from "./createValidationSchema"
import { TextField } from "@/shared/ui/TextField"
import {
  DateField,
  FormConfig,
  FormField,
  InputTextField,
  SelectField,
} from "../configs/types"
import { Select } from "@/shared/ui/Select"
import { CustomDatePicker } from "../fields/DateField/DateField"
import RadioField from "../fields/RadioFireld/RadioField"
import CheckboxField from "../fields/CheckboxField/CheckboxField"
import { RefObject, useImperativeHandle, useState } from "react"
import { CategoryTitle } from "../../common/CategoryTitle/CategoryTitle"
import { cn } from "@/lib/utils"
import { DiscreteSliderValues } from "../fields/SliderField/Slider"

interface FormBuilderProps {
  formRef: RefObject<{ isDirty: boolean }>
  config: FormConfig
  onSubmit: (data: any) => void
}

type WidthFields = InputTextField | DateField | SelectField

const groupFieldsByRows = (fields: WidthFields[]) => {
  const rows: FormField[][] = []
  let currentRow: FormField[] = []
  let currentWidth = 0

  fields.forEach(field => {
    const fieldWidth =
      field.width === "1/3" ? 1 / 3 : field.width === "1/2" ? 1 / 2 : 1

    if (currentWidth + fieldWidth > 1) {
      rows.push(currentRow)
      currentRow = [field]
      currentWidth = fieldWidth
    } else {
      currentRow.push(field)
      currentWidth += fieldWidth
    }
  })

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

const renderFields = (
  fields: FormField[],
  renderField: (field: FormField) => JSX.Element
) => {
  const rows = groupFieldsByRows(fields as WidthFields[])

  return rows.map((row, rowIndex) => (
    <div
      key={rowIndex}
      className="flex gap-3 items-end max-w-7xl"
      style={{ maxWidth: "700px" }}
    >
      {row.map(field => {
        if (field.type !== "radio" && field.type !== "checkbox") {
          return (
            <div
              key={field.id}
              className={cn({
                "w-1/3": field.width === "1/3",
                "w-1/2": field.width === "1/2",
                "w-full": !field.width || field.width === "full",
              })}
            >
              {renderField(field)}
            </div>
          )
        } else {
          return <div key={field.id}>{renderField(field)}</div>
        }
      })}
    </div>
  ))
}

const FormBuilder = ({ config, onSubmit, formRef }: FormBuilderProps) => {
  const categories = Object.values(config.categories)
  const allFields = categories.flatMap(category => category.fields)
  const validationSchema = createValidationSchema(allFields)
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean
  }>({})

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const formValues = useWatch({ control })
  console.log(formValues)

  useImperativeHandle(formRef, () => ({
    isDirty,
  }))

  const toggleExpandCategory = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }))
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return (
          <Controller
            key={field.name}
            name={field.name as never}
            control={control}
            render={({ field: { onChange, value } }) => {
              const disabled = field?.disabledFn
                ? field.disabledFn(formValues)
                : false
              const computedValue =
                field.valueFn && formValues
                  ? field.valueFn(formValues, value)
                  : value
              return (
                <div>
                  <TextField
                    id={field.id}
                    placeholder={field.label}
                    label={field.label}
                    value={computedValue}
                    onChange={onChange}
                    className="w-px-1"
                    error={errors[field.name]?.message}
                    disabled={disabled}
                  />
                </div>
              )
            }}
          />
        )
      case "date":
        return (
          <CustomDatePicker
            key={field.id}
            field={field}
            control={control}
            errors={errors}
          />
        )
      case "select":
        return (
          <Controller
            key={field.name}
            name={field.name as never}
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Select
                renderValue={(value: string) =>
                  field.options.find(o => o.value === value)?.label
                }
                fullWidth
                label={field.label}
                data={field.options}
                selectedValue={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[field.name]?.message as string}
                isRequired={field.required}
                placeholder={field.label}
              />
            )}
          />
        )
      case "radio":
        return (
          <RadioField
            key={field.name}
            field={field}
            control={control}
            errors={errors}
          />
        )
      case "checkbox":
        return (
          <CheckboxField
            key={field.name}
            name={field.name}
            label={field.label}
            control={control}
            errors={errors}
          />
        )
      case "slider":
        return (
          <Controller
            key={field.name}
            name={field.name as never}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DiscreteSliderValues
                onChange={onChange}
                value={value}
                label={field.label}
              />
            )}
          />
        )
      default:
        return null
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      id="create-pet"
      ref={formRef as unknown as RefObject<HTMLFormElement>}
    >
      {Object.entries(config.categories).map(([categoryKey, category]) => {
        const isExpanded = expandedCategories[categoryKey]
        const fieldsToShow = isExpanded
          ? category.fields
          : category.fields.slice(0, category.expandedFields)

        return (
          <div key={categoryKey} className="bg-white shadow-sm rounded-lg p-6">
            <CategoryTitle title={category.title} />
            <div className="space-y-4">
              {renderFields(fieldsToShow, renderField)}
            </div>
            {category.fields.length > category.expandedFields && (
              <button
                type="button"
                onClick={() => toggleExpandCategory(categoryKey)}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                {isExpanded ? "Скрыть" : "Отобразить все поля"}
              </button>
            )}
          </div>
        )
      })}
    </form>
  )
}

export default FormBuilder
