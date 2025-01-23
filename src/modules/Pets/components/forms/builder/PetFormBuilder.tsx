import { useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createValidationSchema } from "./createValidationSchema"
import {} from "../fields"
import { forwardRef, useEffect, useState } from "react"
import { CategoryTitle } from "../../common/CategoryTitle/CategoryTitle"
import { ControlledDate } from "../fields/ControlledDate/ControlledDate"
import { ControlledSelect } from "../fields/ControlledSelect/ControlledSelect"
import { ControlledRadio } from "../fields/ControlledRadio/ControlledRadio"
import { ControlledCheckbox } from "../fields/ControlledCheckbox/ControlledCheckbox"
import { ControlledSlider } from "../fields/ControlledSlider/ControlledSlider"
import { ControlledText } from "../fields/ControlledText/ControlledText"
import { FormConfig, FormField } from "../types/types"
import { usePetFormStore } from "@/modules/Pets/store"
import { renderFields } from "../utils/groupFormFields"

interface FormBuilderProps {
  config: FormConfig
  onSubmit: (data: FormData) => void
  onCloseForm: () => void
}

const FormBuilder = forwardRef(({ config, onSubmit }: FormBuilderProps) => {
  const categories = Object.values(config.categories)
  const allFields = categories.flatMap(category => category.fields)
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean
  }>({})

  const setIsDirty = usePetFormStore(state => state.setIsDirty)
  const validationSchema = createValidationSchema(allFields)
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const formValues = useWatch({ control })

  console.log(formValues)

  const hasDirtyFields = Object.keys(dirtyFields).length > 0

  useEffect(() => {
    if (hasDirtyFields) {
      setIsDirty(true)
    } else {
      setIsDirty(false)
    }
  }, [hasDirtyFields, setIsDirty])

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
          <ControlledText
            key={field.name}
            control={control}
            errors={errors}
            formValues={formValues}
            field={field}
          />
        )
      case "date":
        return (
          <ControlledDate
            key={field.id}
            field={field}
            control={control}
            errors={errors}
          />
        )
      case "select":
        return (
          <ControlledSelect
            key={field.name}
            control={control}
            field={field}
            errors={errors}
          />
        )
      case "radio":
        return (
          <ControlledRadio
            key={field.name}
            field={field}
            control={control}
            errors={errors}
          />
        )
      case "checkbox":
        return (
          <ControlledCheckbox
            key={field.name}
            field={field}
            control={control}
            errors={errors}
          />
        )
      case "slider":
        return (
          <ControlledSlider control={control} field={field} errors={errors} />
        )
      default:
        return <div>Unknown field type!</div>
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as never)}
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
})

export default FormBuilder
