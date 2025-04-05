import { forwardRef, useEffect, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, useWatch } from "react-hook-form"

import { usePetFormStore } from "@/modules/Pets/store"

import { CategoryTitle } from "../../common/CategoryTitle/CategoryTitle"
import { ControlledCheckbox } from "../fields/ControlledCheckbox/ControlledCheckbox"
import { ControlledDate } from "../fields/ControlledDate/ControlledDate"
import { ControlledRadio } from "../fields/ControlledRadio/ControlledRadio"
import { ControlledSelect } from "../fields/ControlledSelect/ControlledSelect"
import { ControlledSlider } from "../fields/ControlledSlider/ControlledSlider"
import { ControlledText } from "../fields/ControlledText/ControlledText"
import { FormConfig, FormData, FormField } from "../types/types"
import { renderFields } from "../utils/groupFormFields"
import { createValidationSchema } from "./createValidationSchema"

interface FormBuilderProps {
  config: FormConfig
  onSubmit?: (data: FormData) => void
  defaultValues?: FormData
  viewMode?: boolean
  formId: string
}

const FormBuilder = forwardRef(
  ({ config, onSubmit, defaultValues, viewMode, formId }: FormBuilderProps) => {
    const categories = Object.values(config?.categories || {})
    const allFields = categories.flatMap(category => category?.fields)
    const [expandedCategories, setExpandedCategories] = useState<{
      [key: string]: boolean
    }>({})

    const setIsDirty = usePetFormStore(state => state.setIsDirty)
    const setDirtyFields = usePetFormStore(state => state.setDirtyFields)

    const validationSchema = createValidationSchema(allFields)
    const {
      control,
      handleSubmit,
      formState: { errors, dirtyFields },
    } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues,
    })

    const formValues = useWatch({ control })

    const hasDirtyFields = Object.keys(dirtyFields).length > 0

    useEffect(() => {
      if (hasDirtyFields) {
        setIsDirty(true)
        setDirtyFields(dirtyFields)
      } else {
        setIsDirty(false)
        setDirtyFields({})
      }
    }, [hasDirtyFields, setIsDirty, setDirtyFields, dirtyFields])

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
              readOnly={viewMode}
            />
          )
        case "date":
          return (
            <ControlledDate
              key={field.id}
              field={field}
              control={control}
              errors={errors}
              readOnly={viewMode}
              formValues={formValues}
            />
          )
        case "select":
          return (
            <ControlledSelect
              key={field.name}
              control={control}
              field={field}
              errors={errors}
              readOnly={viewMode}
            />
          )
        case "radio":
          return (
            <ControlledRadio
              key={field.name}
              field={field}
              control={control}
              errors={errors}
              readOnly={viewMode}
            />
          )
        case "checkbox":
          return (
            <ControlledCheckbox
              key={field.name}
              field={field}
              control={control}
              errors={errors}
              readOnly={viewMode}
            />
          )
        case "slider":
          return (
            <ControlledSlider
              control={control}
              field={field}
              errors={errors}
              readOnly={viewMode}
            />
          )
        default:
          return <div>Unknown field type!</div>
      }
    }

    return (
      <form
        onSubmit={handleSubmit(onSubmit as never)}
        className="space-y-6"
        id={formId}
      >
        {Object.entries(config.categories).map(([categoryKey, category]) => {
          const isExpanded = expandedCategories[categoryKey]
          const fieldsToShow = isExpanded
            ? category.fields
            : category.fields.slice(0, category.expandedFields)

          return (
            <div key={categoryKey} className="bg-white rounded-lg p-6">
              <CategoryTitle title={category.title} />
              <div>{renderFields(fieldsToShow, renderField)}</div>
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
  },
)

export default FormBuilder
