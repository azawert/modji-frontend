import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createValidationSchema } from "./createValidationSchema"
import { TextField } from "@/shared/ui/TextField"
import { FormConfig, FormField } from "../configs/types"
import { Select } from "@/shared/ui/Select"
import { CustomDatePicker } from "../fields/DateField/DateField"
import RadioField from "../fields/RadioFireld/RadioField"
import CheckboxField from "../fields/CheckboxField/CheckboxField"
import { useState } from "react"
import { CategoryTitle } from "../../common/CategoryTitle/CategoryTitle"

interface FormBuilderProps {
  config: FormConfig
  onSubmit: (data: any) => void
}

const FormBuilder = ({ config, onSubmit }: FormBuilderProps) => {
  const categories = Object.values(config.categories)
  const allFields = categories.flatMap(category => category.fields)
  const validationSchema = createValidationSchema(allFields)
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean
  }>({})

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

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
            render={({ field: { onChange, value } }) => (
              <div>
                <TextField
                  width={"700px"}
                  id={field.id}
                  placeholder={field.label}
                  value={value}
                  onChange={onChange}
                  className="w-px-1"
                  error={errors[field.name]?.message}
                />
              </div>
            )}
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
                width="700px"
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
      default:
        return null
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      id="create-pet"
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
              {fieldsToShow.map(field => renderField(field))}
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
