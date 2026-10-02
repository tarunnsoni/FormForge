import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Hash,
  ListChecks,
  Mail,
  Phone,
  Star,
  TextCursorInput,
  Trash2,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Field, FieldType } from '@/lib/form-builder/schema'
import type { FormBuilder } from './use-form-builder'

export const FIELD_TYPES: Array<{
  type: FieldType
  label: string
  icon: typeof AlignLeft
}> = [
  { type: 'text', label: 'Short text', icon: TextCursorInput },
  { type: 'textarea', label: 'Long text', icon: AlignLeft },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'phone', label: 'Phone', icon: Phone },
  { type: 'date', label: 'Date', icon: Calendar },
  { type: 'select', label: 'Dropdown', icon: ListChecks },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'rating', label: 'Rating', icon: Star },
]

const TYPE_LABELS: Record<FieldType, string> = Object.fromEntries(
  FIELD_TYPES.map(({ type, label }) => [type, label]),
) as Record<FieldType, string>

interface Props {
  builder: FormBuilder
}

export function BuilderCanvas({ builder }: Props) {
  const {
    fields,
    selectedFieldId,
    selectField,
    updateField,
    removeField,
    duplicateField,
    moveField,
    addField,
  } = builder

  if (fields.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/60 px-6 py-16 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-indigo-50">
          <GripVertical className="size-5 text-indigo-500" />
        </div>
        <p className="mt-3 text-sm font-semibold text-neutral-800">
          No questions yet
        </p>
        <p className="mt-1 max-w-xs text-xs text-neutral-500">
          Add your first question, or refine the form with AI from the panel on
          the right.
        </p>
        <button
          type="button"
          onClick={() => addField('text')}
          className="mt-4 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
        >
          + Add a question
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <FieldCard
          key={field.id}
          field={field}
          index={index}
          total={fields.length}
          selected={field.id === selectedFieldId}
          onSelect={() => selectField(field.id)}
          onUpdate={(patch) => updateField(field.id, patch)}
          onRemove={() => removeField(field.id)}
          onDuplicate={() => duplicateField(field.id)}
          onMove={(direction) => moveField(field.id, direction)}
        />
      ))}

      <button
        type="button"
        onClick={() => addField('text')}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 bg-white/60 py-2.5 text-xs font-medium text-neutral-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600"
      >
        + Add another question
      </button>
    </div>
  )
}

interface FieldCardProps {
  field: Field
  index: number
  total: number
  selected: boolean
  onSelect: () => void
  onUpdate: (patch: Partial<Field>) => void
  onRemove: () => void
  onDuplicate: () => void
  onMove: (direction: 'up' | 'down') => void
}

function FieldCard({
  field,
  index,
  total,
  selected,
  onSelect,
  onUpdate,
  onRemove,
  onDuplicate,
  onMove,
}: FieldCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSelect()
      }}
      className={cn(
        'group relative cursor-pointer rounded-2xl border bg-white p-4 text-left transition-all',
        selected
          ? 'border-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
          : 'border-neutral-200 hover:border-neutral-300',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
              {TYPE_LABELS[field.type]}
            </span>
            {field.required ? (
              <span className="text-[10px] font-medium text-red-500">
                Required
              </span>
            ) : null}
          </div>

          <p className="mt-2 truncate text-sm font-semibold text-neutral-900">
            {field.label || 'Untitled question'}
            {field.required ? <span className="text-red-500"> *</span> : null}
          </p>

          {field.helpText ? (
            <p className="mt-0.5 truncate text-xs text-neutral-500">
              {field.helpText}
            </p>
          ) : null}

          {field.type === 'select' && field.options?.length ? (
            <ul className="mt-2 space-y-1">
              {field.options.slice(0, 4).map((option) => (
                <li
                  key={option}
                  className="flex items-center gap-1.5 text-xs text-neutral-500"
                >
                  <span className="size-3 rounded-full border border-neutral-300" />
                  {option}
                </li>
              ))}
            </ul>
          ) : null}

          {field.type === 'checkbox' ? (
            <p className="mt-2 text-xs text-neutral-500">
              ☐ {field.placeholder || 'Yes, I confirm.'}
            </p>
          ) : null}

          {field.type === 'rating' ? (
            <p className="mt-2 text-xs text-neutral-500">
              ★ {field.minRating ?? 1} – {field.maxRating ?? 5}
            </p>
          ) : null}

          {['text', 'textarea', 'email', 'number', 'phone', 'date'].includes(
            field.type,
          ) ? (
            <div className="mt-2 h-8 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-400">
              {field.placeholder || 'Preview'}
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            'flex shrink-0 items-center gap-0.5 transition-opacity',
            selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <IconButton
            title="Move up"
            disabled={index === 0}
            onClick={() => onMove('up')}
          >
            <ChevronUp className="size-3.5" />
          </IconButton>
          <IconButton
            title="Move down"
            disabled={index === total - 1}
            onClick={() => onMove('down')}
          >
            <ChevronDown className="size-3.5" />
          </IconButton>
          <IconButton title="Duplicate" onClick={onDuplicate}>
            <Copy className="size-3.5" />
          </IconButton>
          <IconButton
            title="Delete"
            danger
            onClick={onRemove}
          >
            <Trash2 className="size-3.5" />
          </IconButton>
        </div>
      </div>

      {selected ? (
        <div
          className="mt-4 border-t border-neutral-100 pt-4"
          onClick={(event) => event.stopPropagation()}
        >
          <FieldEditor field={field} onUpdate={onUpdate} />
        </div>
      ) : null}
    </div>
  )
}

function IconButton({
  children,
  title,
  disabled,
  danger,
  onClick,
}: {
  children: React.ReactNode
  title: string
  disabled?: boolean
  danger?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-30',
        danger && 'hover:bg-red-50 hover:text-red-600',
      )}
    >
      {children}
    </button>
  )
}

const editorInputClasses =
  'h-8 w-full rounded-lg border border-neutral-200 bg-white px-2.5 text-xs text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

function FieldEditor({
  field,
  onUpdate,
}: {
  field: Field
  onUpdate: (patch: Partial<Field>) => void
}) {
  return (
    <div className="space-y-3" onClick={(event) => event.stopPropagation()}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
            Question
          </span>
          <input
            value={field.label}
            onChange={(event) => onUpdate({ label: event.target.value })}
            className={editorInputClasses}
            placeholder="e.g. What is your email?"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
            Placeholder / hint
          </span>
          <input
            value={field.placeholder ?? ''}
            onChange={(event) =>
              onUpdate({
                placeholder: event.target.value || undefined,
              })
            }
            className={editorInputClasses}
            placeholder="Shown inside the input"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
          Help text
        </span>
        <input
          value={field.helpText ?? ''}
          onChange={(event) =>
            onUpdate({ helpText: event.target.value || undefined })
          }
          className={editorInputClasses}
          placeholder="Optional small note under the question"
        />
      </label>

      {field.type === 'select' ? (
        <div>
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
            Options
          </span>
          <div className="space-y-1.5">
            {(field.options ?? []).map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-1.5">
                <input
                  value={option}
                  onChange={(event) => {
                    const options = [...(field.options ?? [])]
                    options[optionIndex] = event.target.value
                    onUpdate({ options })
                  }}
                  className={editorInputClasses}
                />
                <IconButton
                  title="Remove option"
                  danger
                  onClick={() =>
                    onUpdate({
                      options: (field.options ?? []).filter(
                        (_, i) => i !== optionIndex,
                      ),
                    })
                  }
                >
                  <Trash2 className="size-3.5" />
                </IconButton>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              onUpdate({
                options: [
                  ...(field.options ?? []),
                  `Option ${(field.options?.length ?? 0) + 1}`,
                ],
              })
            }
            className="mt-1.5 text-[11px] font-medium text-indigo-600 hover:text-indigo-700"
          >
            + Add option
          </button>
        </div>
      ) : null}

      {field.type === 'rating' ? (
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
              Min
            </span>
            <input
              type="number"
              value={field.minRating ?? 1}
              onChange={(event) =>
                onUpdate({ minRating: Number(event.target.value) })
              }
              className={editorInputClasses}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-neutral-500">
              Max
            </span>
            <input
              type="number"
              value={field.maxRating ?? 5}
              onChange={(event) =>
                onUpdate({ maxRating: Number(event.target.value) })
              }
              className={editorInputClasses}
            />
          </label>
        </div>
      ) : null}

      <label className="flex w-fit cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(event) => onUpdate({ required: event.target.checked })}
          className="size-3.5 accent-indigo-600"
        />
        <span className="text-xs font-medium text-neutral-700">
          Require an answer
        </span>
      </label>
    </div>
  )
}
