import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Plus, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import { generateFormFn } from '@/lib/form-builder/server-fns'
import type { FieldType } from '@/lib/form-builder/schema'
import type { FormBuilder } from './use-form-builder'
import { FIELD_TYPES } from './builder-canvas'

interface Props {
  builder: FormBuilder
}

export function BuilderSidebar({ builder }: Props) {
  const [instruction, setInstruction] = useState('')
  const [notice, setNotice] = useState<string | null>(null)

  const refine = useMutation({
    mutationKey: ['refine-form'],
    mutationFn: async () => {
      const definition = builder.getDefinition()
      const prompt = [
        `Current form (JSON): ${JSON.stringify(definition)}`,
        `Change request: ${instruction.trim()}`,
        'Return the FULL updated form definition, keeping existing questions unless the request says otherwise.',
      ].join('\n\n')

      return generateFormFn({ data: { prompt } })
    },
    onSuccess: ({ form }) => {
      builder.loadDefinition(form)
      setInstruction('')
      setNotice(
        form.fields.length > 0
          ? 'Form updated by AI.'
          : 'AI returned no fields; form unchanged.',
      )
    },
    onError: (error: Error) => {
      setNotice(`Refine failed: ${error.message}`)
    },
  })

  return (
    <div className="space-y-5">
      {/* AI refine */}
      <section>
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-indigo-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
            Refine with AI
          </h3>
        </div>

        <div className="mt-2 rounded-xl border border-neutral-200 bg-white p-2">
          <textarea
            value={instruction}
            onChange={(event) => {
              setInstruction(event.target.value)
              setNotice(null)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                if (instruction.trim() && !refine.isPending) {
                  refine.mutate()
                }
              }
            }}
            rows={2}
            placeholder="e.g. Add a phone number question and make the rating 0-10..."
            className="w-full resize-none border-0 bg-transparent px-1 text-xs text-neutral-800 outline-none placeholder:text-neutral-400"
          />
          <button
            type="button"
            disabled={!instruction.trim() || refine.isPending}
            onClick={() => refine.mutate()}
            className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-50"
          >
            {refine.isPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" />
                Apply changes
              </>
            )}
          </button>
        </div>

        {notice ? (
          <p className="mt-1.5 text-[10px] text-neutral-500">{notice}</p>
        ) : null}
      </section>

      {/* Quick add */}
      <section>
        <div className="flex items-center gap-1.5">
          <Plus className="size-3.5 text-neutral-500" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
            Add question
          </h3>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {FIELD_TYPES.map(({ type, label, icon }) => (
            <QuickAddButton
              key={type}
              type={type}
              label={label}
              icon={icon}
              onAdd={builder.addField}
            />
          ))}
        </div>
      </section>

      {/* Outline */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
          Outline
        </h3>

        {builder.fields.length === 0 ? (
          <p className="mt-2 text-[11px] text-neutral-400">
            Your questions will appear here.
          </p>
        ) : (
          <ol className="mt-2 space-y-0.5">
            {builder.fields.map((field, index) => (
              <li key={field.id}>
                <button
                  type="button"
                  onClick={() => builder.selectField(field.id)}
                  className={cn(
                    'flex w-full items-center gap-2 truncate rounded-lg px-2 py-1.5 text-left text-[11px] transition-colors',
                    field.id === builder.selectedFieldId
                      ? 'bg-indigo-50 font-medium text-indigo-700'
                      : 'text-neutral-600 hover:bg-neutral-100',
                  )}
                >
                  <span className="shrink-0 text-neutral-400">
                    {index + 1}.
                  </span>
                  <span className="truncate">
                    {field.label || 'Untitled question'}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

function QuickAddButton({
  type,
  label,
  icon: Icon,
  onAdd,
}: {
  type: FieldType
  label: string
  icon: typeof Plus
  onAdd: (type: FieldType) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onAdd(type)}
      title={`Add ${label.toLowerCase()} question`}
      className="flex flex-col items-center gap-1 rounded-lg border border-neutral-200 bg-white px-1 py-2 text-[9px] font-medium text-neutral-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600"
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  )
}

