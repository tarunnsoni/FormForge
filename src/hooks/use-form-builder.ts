import { useState } from 'react'

import type {
  FieldType,
  FormField,
  FormBuilderState,
} from '@/lib/form-builder/types'

const initialState: FormBuilderState = {
  id: null,
  title: 'Untitled Form',
  description: '',
  fields: [],
}

export function useFormBuilder() {
  const [form, setForm] = useState(initialState)
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)

  function addField(type: FieldType) {
    const newField: FormField = {
      id: crypto.randomUUID(),
      form_id: form.id,
      type,
      label: 'Untitled question',
      description: '',
      required: false,
      position: form.fields.length,
      config: {},
    }

    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }))

    setSelectedFieldId(newField.id)
  }

  function removeField(id: string) {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields
        .filter((field) => field.id !== id)
        .map((field, index) => ({
          ...field,
          position: index,
        })),
    }))

    setSelectedFieldId((current) => (current === id ? null : current))
  }

  function updateField(id: string, updates: Partial<FormField>) {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    }))
  }

  function updateTitle(title: string) {
    setForm((prev) => ({ ...prev, title }))
  }

  function updateDescription(description: string) {
    setForm((prev) => ({ ...prev, description }))
  }

  function selectField(id: string | null) {
    setSelectedFieldId(id)
  }

  function reorderFields(activeId: string, overId: string) {
    setForm((prev) => {
      const fields = [...prev.fields]

      const fromIndex = fields.findIndex((field) => field.id === activeId)
      const toIndex = fields.findIndex((field) => field.id === overId)

      if (fromIndex === -1 || toIndex === -1) return prev

      const [movedField] = fields.splice(fromIndex, 1)
      fields.splice(toIndex, 0, movedField)

      return {
        ...prev,
        fields: fields.map((field, index) => ({
          ...field,
          position: index,
        })),
      }
    })
  }

  const selectedField =
    form.fields.find((field) => field.id === selectedFieldId) ?? null

  function duplicateField(id: string) {
    setForm((prev) => {
      const index = prev.fields.findIndex((field) => field.id === id)

      if (index === -1) return prev

      const original = prev.fields[index]

      const duplicated: FormField = {
        ...original,
        id: crypto.randomUUID(),
        label: `${original.label} (Copy)`,
        config: { ...original.config },
        position: index + 1,
      }

      const fields = [...prev.fields]
      fields.splice(index + 1, 0, duplicated)

      return {
        ...prev,
        fields: fields.map((field, i) => ({
          ...field,
          position: i,
        })),
      }
    })
  }

  return {
    form,
    selectedField,
    selectedFieldId,

    addField,
    removeField,
    updateField,
    updateTitle,
    updateDescription,
    selectField,
    reorderFields,
    duplicateField,
  }
}
