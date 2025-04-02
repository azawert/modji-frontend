interface ITextField {
  id: string
  label: string
  placeholder?: string
  required: boolean
}

type ClientField =
  | "lastName"
  | "firstName"
  | "middleName"
  | "mainPhone"
  | "optionalPhone"
  | "rating"

export interface IShortClientConfig {
  [key: string | ClientField]: ITextField
}
