import { Star } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Field } from '@/lib/form-builder/schema'

export type AnswerValue = string | number | boolean | undefined

interface Props {
  field: Field
  value: AnswerValue
  onChange: (value: AnswerValue) => void
  hasError?: boolean
}

const inputClasses =
  'h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-none outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'

export function FormFieldRenderer({ field, value, onChange, hasError }: Props) {
  const invalid = hasError ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          rows={4}
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={cn(
            'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-none outline-none transition-colors placeholder:text-neutral-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100',
            invalid,
          )}
        />
      )

    case 'select':
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClasses, 'text-neutral-700', invalid, !value && 'text-neutral-400')}
        >
          <option value="" disabled>
            Select an option
          </option>
          {(field.options ?? []).map((option) => (
            <option key={option} value={option} className="text-neutral-900">
              {option}
            </option>
          ))}
        </select>
      )

    case 'checkbox':
      return (
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-indigo-600"
          />
          <span className="text-sm text-neutral-600">
            {field.placeholder || 'Yes, I confirm.'}
          </span>
        </label>
      )

    case 'rating': {
      const min = field.minRating ?? 1
      const max = field.maxRating ?? 5
      const rating = typeof value === 'number' ? value : 0
      const items = Array.from({ length: max - min + 1 }, (_, i) => min + i)

      if (items.length > 6) {
        // NPS-style scale rendered as numbered pills
        return (
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onChange(item)}
                className={cn(
                  'size-8 rounded-full border text-xs font-medium transition-colors',
                  rating === item
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-indigo-300 hover:bg-indigo-50',
                )}
              >
                {item}
              </button>
            ))}
          </div>
        )
      }

      return (
        <div className="flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-label={`Rate ${item}`}
              className="p-0.5"
            >
              <Star
                className={cn(
                  'size-6 transition-colors',
                  rating >= item
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-neutral-300 hover:text-amber-300',
                )}
              />
            </button>
          ))}
        </div>
      )
    }

    case 'date':
      return (
        <input
          type="date"
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClasses, invalid)}
        />
      )

    case 'number':
      return (
        <input
          type="number"
          inputMode="numeric"
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={cn(inputClasses, invalid)}
        />
      )

    case 'phone':
      return (
        <input
          type="tel"
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder ?? '+1 (555) 000-0000'}
          className={cn(inputClasses, invalid)}
        />
      )

    case 'email':
      return (
        <input
          type="email"
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder ?? 'you@example.com'}
          className={cn(inputClasses, invalid)}
        />
      )

    case 'text':
    default:
      return (
        <input
          type="text"
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={cn(inputClasses, invalid)}
        />
      )
  }
}
