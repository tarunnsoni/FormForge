import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

import type { FormBuilder } from './use-form-builder'
import {
  FormFieldRenderer,
  type AnswerValue,
} from './form-field-renderer'

interface Props {
  builder: FormBuilder
}

export function LivePreview({ builder }: Props) {
  const { fields, title, description } = builder

  const initialValues = useMemo(
    () =>
      Object.fromEntries(
        fields.map((field) => [field.id, field.type === 'checkbox' ? false : undefined]),
      ),
    // Only reset when the set of field ids changes, not on every keystroke.
    [fields.map((field) => field.id).join('|')],
  )

  const [values, setValues] = useState<Record<string, AnswerValue>>(initialValues)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')

  useEffect(() => {
    setValues((prev) => {
      const next: Record<string, AnswerValue> = {}
      for (const field of fields) {
        next[field.id] = prev[field.id] ?? initialValues[field.id]
      }
      return next
    })
  }, [initialValues, fields])

  const handleSubmit = async () => {
    const nextErrors: Record<string, boolean> = {}

    for (const field of fields) {
      const value = values[field.id]
      const empty =
        value === undefined ||
        value === '' ||
        (field.type === 'checkbox' && value !== true)

      if (field.required && empty) nextErrors[field.id] = true
      if (
        field.type === 'email' &&
        typeof value === 'string' &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        nextErrors[field.id] = true
      }
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    // Simulated submit — replace with Supabase insert server fn later.
    await new Promise((resolve) => setTimeout(resolve, 700))
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center">
        <CheckCircle2 className="size-10 text-emerald-500" />
        <p className="mt-3 text-sm font-semibold text-neutral-900">
          Response submitted!
        </p>
        <p className="mt-1 max-w-xs text-xs text-neutral-500">
          This is how your form will behave for visitors. Submissions will be
          stored in your dashboard.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialValues)
            setStatus('idle')
          }}
          className="mt-4 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Submit another response
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
      <h2 className="text-base font-bold text-neutral-900 sm:text-lg">
        {title || 'Untitled form'}
      </h2>
      {description ? (
        <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
          {description}
        </p>
      ) : null}

      <div className="mt-5 space-y-5">
        {fields.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-200 px-4 py-8 text-center text-xs text-neutral-400">
            Add questions to see a live preview of your form.
          </p>
        ) : (
          fields.map((field) => (
            <div key={field.id}>
              {field.type !== 'checkbox' ? (
                <label className="mb-1.5 block text-sm font-medium text-neutral-800">
                  {field.label || 'Untitled question'}
                  {field.required ? (
                    <span className="text-red-500"> *</span>
                  ) : null}
                </label>
              ) : null}

              <FormFieldRenderer
                field={field}
                value={values[field.id]}
                hasError={Boolean(errors[field.id])}
                onChange={(value) => {
                  setValues((prev) => ({ ...prev, [field.id]: value }))
                  setErrors((prev) => ({ ...prev, [field.id]: false }))
                }}
              />

              {field.helpText ? (
                <p className="mt-1 text-[11px] text-neutral-400">
                  {field.helpText}
                </p>
              ) : null}

              {errors[field.id] ? (
                <p className="mt-1 text-[11px] font-medium text-red-500">
                  {field.type === 'email' && values[field.id]
                    ? 'Please enter a valid email address.'
                    : 'This question is required.'}
                </p>
              ) : null}
            </div>
          ))
        )}

        {fields.length > 0 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-none transition-colors hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        ) : null}
      </div>
    </div>
  )
}
