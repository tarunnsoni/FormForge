import { useCallback, useMemo, useReducer } from 'react'

import {
  createEmptyField,
  type Field,
  type FieldType,
  type FormDefinition,
} from '@/lib/form-builder/schema'

interface BuilderState {
  title: string
  description: string
  fields: Array<Field>
  selectedFieldId: string | null
}

type BuilderAction =
  | { type: 'load'; definition: FormDefinition }
  | { type: 'setTitle'; title: string }
  | { type: 'setDescription'; description: string }
  | { type: 'addField'; fieldType?: FieldType; index?: number }
  | { type: 'duplicateField'; id: string }
  | { type: 'removeField'; id: string }
  | { type: 'moveField'; id: string; direction: 'up' | 'down' }
  | { type: 'updateField'; id: string; patch: Partial<Field> }
  | { type: 'selectField'; id: string | null }

const initialState: BuilderState = {
  title: 'Untitled form',
  description: '',
  fields: [],
  selectedFieldId: null,
}

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'load': {
      const fields = action.definition.fields.map((field) => ({
        ...field,
        required: field.required ?? false,
      }))

      return {
        title: action.definition.title,
        description: action.definition.description,
        fields,
        selectedFieldId: fields[0]?.id ?? null,
      }
    }

    case 'setTitle':
      return { ...state, title: action.title }

    case 'setDescription':
      return { ...state, description: action.description }

    case 'addField': {
      const field = createEmptyField(action.fieldType)
      const fields = [...state.fields]
      const index = action.index ?? fields.length

      fields.splice(Math.max(0, Math.min(index, fields.length)), 0, field)

      return { ...state, fields, selectedFieldId: field.id }
    }

    case 'duplicateField': {
      const sourceIndex = state.fields.findIndex((f) => f.id === action.id)
      if (sourceIndex === -1) return state

      const source = state.fields[sourceIndex]
      const copy = createEmptyField(source.type)

      const fields = [
        ...state.fields.slice(0, sourceIndex + 1),
        { ...source, id: copy.id, label: `${source.label} (copy)` },
        ...state.fields.slice(sourceIndex + 1),
      ]

      return { ...state, fields, selectedFieldId: copy.id }
    }

    case 'removeField': {
      const fields = state.fields.filter((f) => f.id !== action.id)
      const selectedFieldId =
        state.selectedFieldId === action.id
          ? (fields[0]?.id ?? null)
          : state.selectedFieldId

      return { ...state, fields, selectedFieldId }
    }

    case 'moveField': {
      const index = state.fields.findIndex((f) => f.id === action.id)
      const target = action.direction === 'up' ? index - 1 : index + 1

      if (index === -1 || target < 0 || target >= state.fields.length) {
        return state
      }

      const fields = [...state.fields]
      const [moved] = fields.splice(index, 1)
      fields.splice(target, 0, moved)

      return { ...state, fields }
    }

    case 'updateField': {
      const fields = state.fields.map((f) =>
        f.id === action.id ? { ...f, ...action.patch, id: f.id } : f,
      )

      return { ...state, fields }
    }

    case 'selectField':
      return { ...state, selectedFieldId: action.id }

    default:
      return state
  }
}

export function useFormBuilder() {
  const [state, dispatch] = useReducer(builderReducer, initialState)

  const actions = useMemo(
    () => ({
      loadDefinition: (definition: FormDefinition) =>
        dispatch({ type: 'load', definition }),
      setTitle: (title: string) => dispatch({ type: 'setTitle', title }),
      setDescription: (description: string) =>
        dispatch({ type: 'setDescription', description }),
      addField: (fieldType?: FieldType, index?: number) =>
        dispatch({ type: 'addField', fieldType, index }),
      duplicateField: (id: string) => dispatch({ type: 'duplicateField', id }),
      removeField: (id: string) => dispatch({ type: 'removeField', id }),
      moveField: (id: string, direction: 'up' | 'down') =>
        dispatch({ type: 'moveField', id, direction }),
      updateField: (id: string, patch: Partial<Field>) =>
        dispatch({ type: 'updateField', id, patch }),
      selectField: (id: string | null) =>
        dispatch({ type: 'selectField', id }),
    }),
    [],
  )

  const getDefinition = useCallback(
    (): FormDefinition => ({
      title: state.title.trim() || 'Untitled form',
      description: state.description.trim(),
      fields: state.fields,
    }),
    [state.title, state.description, state.fields],
  )

  const canSave = state.fields.length > 0 && state.title.trim().length > 0

  return {
    title: state.title,
    description: state.description,
    fields: state.fields,
    selectedFieldId: state.selectedFieldId,
    canSave,
    ...actions,
    getDefinition,
  }
}

export type FormBuilder = ReturnType<typeof useFormBuilder>
