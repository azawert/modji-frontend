type WidthType = "full" | "1/3" | "1/2"
type SelectOption = {
  value: string
  label: string
}

type RadioOption = {
  value: boolean
  label: string
}

export interface SelectField {
  name: string
  id: string
  type: "select"
  options: SelectOption[]
  label: string
  required: boolean
  validationErr?: string
  width: WidthType
}

export interface SliderField {
  name: string
  id: string
  type: "slider"
  label: string
}

export interface RadioField {
  name: string
  id: string
  type: "radio"
  label: string
  options: RadioOption[]
  required: boolean
  validationErr?: string
}

export interface CheckboxField {
  name: string
  id: string
  type: "checkbox"
  label: string
  required: boolean
  validationErr?: string
}

export interface DateField {
  name: string
  id: string
  type: "date"
  isPast: boolean
  label: string
  required: boolean
  validationErr?: string
  width: WidthType
  valueFn?: (value: string) => string
  disabledFn?: (formState: string) => boolean
}

export interface InputTextField {
  name: string
  id: string
  type: "text"
  label: string
  required: boolean
  validationErr?: string
  minLetters?: number
  width: WidthType
  valueFn?: (formState: { [key: string]: string }, value: string) => string
  disabledFn?: (formState: { [key: string]: string }) => boolean
}

export type FormField =
  | InputTextField
  | DateField
  | SelectField
  | RadioField
  | CheckboxField
  | SliderField

type FormCategory = "commonInfo" | "health" | "behavior" | "feeding"

export interface FormConfig {
  categories: {
    [key in FormCategory]: {
      title: string
      expandedFields: number
      fields: FormField[]
    }
  }
}
