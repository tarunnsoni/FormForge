export type FieldType =
  | 'short_text'
  | 'long_text'
  | 'email'
  | 'number'
  | 'multiple_choice'
  | 'checkbox'
  | 'dropdown'
  | 'rating'
  | 'date'

export type FieldConfig = {
  options?: string[]
  min?: number
  max?: number
  maxLength?: number
}

export type FormField = {
  id: string
  form_id: string | null
  type: FieldType
  label: string
  description: string | null
  required: boolean
  position: number
  config: FieldConfig
}

export type FormBuilderState = {
  id: string | null
  title: string
  description: string | null
  fields: FormField[]
}
