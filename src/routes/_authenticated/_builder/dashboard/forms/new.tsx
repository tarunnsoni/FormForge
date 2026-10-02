import { useEffect, useState } from 'react'
import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import {
  ArrowLeft,
  Check,
  Eye,
  Loader2,
  PencilLine,
  Save,
  Sparkles,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { formDefinitionSchema } from '@/lib/form-builder/schema'
import { generateFormFn } from '@/lib/form-builder/server-fns'
import { BuilderCanvas } from './-components/builder-canvas'
import { BuilderSidebar } from './-components/builder-sidebar'
import { LivePreview } from './-components/live-preview'
import { useFormBuilder } from './-components/use-form-builder'

export const Route = createFileRoute(
  '/_authenticated/_builder/dashboard/forms/new',
)({
  validateSearch: z.object({
    prompt: z.string().trim().default(''),
  }),
  component: RouteComponent,
})

type Phase = 'generating' | 'editing' | 'preview'
type SavedState = 'idle' | 'saving' | 'saved'

const DRAFT_KEY = 'formforge:draft:new-form'

function RouteComponent() {
  const { prompt } = Route.useSearch()
  const navigate = useNavigate()
  const builder = useFormBuilder()

  const [phase, setPhase] = useState<Phase>(prompt ? 'generating' : 'editing')
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [saved, setSaved] = useState<SavedState>('idle')

  const generation = useMutation({
    mutationKey: ['generate-form', prompt],
    mutationFn: () => generateFormFn({ data: { prompt } }),
    onSuccess: ({ form }) => {
      const parsed = formDefinitionSchema.safeParse(form)
      if (parsed.success) {
        builder.loadDefinition(parsed.data)
      } else {
        setGenerationError(
          'The AI returned an unexpected structure. You can start from a blank form and edit it manually.',
        )
      }
      setPhase('editing')
    },
    onError: (error: Error) => {
      setGenerationError(error.message)
      setPhase('editing')
    },
  })

  // Kick off AI generation once when arriving with a prompt.
  useEffect(() => {
    if (prompt && !generation.isPending && !generation.data) {
      generation.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt])

  // Restore a local draft when arriving without a prompt (page refresh safe).
  useEffect(() => {
    if (prompt || builder.fields.length > 0) return

    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return

      const parsed = formDefinitionSchema.safeParse(JSON.parse(raw))
      if (parsed.success) builder.loadDefinition(parsed.data)
    } catch {
      // Corrupt draft — ignore.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist draft while editing.
  useEffect(() => {
    if (phase === 'generating' || builder.fields.length === 0) return

    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(builder.getDefinition()))
    } catch {
      // Storage full/unavailable — non-fatal.
    }
  }, [phase, builder])

  const handleSave = async () => {
    setSaved('saving')

    // TODO: persist to Supabase (`forms` table) via a server function.
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSaved('saved')
    setTimeout(() => setSaved('idle'), 2000)
  }

  if (phase === 'generating') {
    return <GeneratingScreen prompt={prompt} />
  }

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col">
      {/* Builder top bar */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </button>

          <p className="hidden truncate text-sm font-semibold text-neutral-900 sm:block">
            {builder.title || 'Untitled form'}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-lg bg-neutral-100 p-0.5 sm:flex">
            <TabButton
              active={phase === 'editing'}
              onClick={() => setPhase('editing')}
              icon={PencilLine}
            >
              Edit
            </TabButton>
            <TabButton
              active={phase === 'preview'}
              onClick={() => setPhase('preview')}
              icon={Eye}
            >
              Preview
            </TabButton>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!builder.canSave || saved === 'saving'}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium text-white transition-colors disabled:pointer-events-none disabled:opacity-50',
              saved === 'saved'
                ? 'bg-emerald-600'
                : 'bg-indigo-600 hover:bg-indigo-700',
            )}
          >
            {saved === 'saving' ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : saved === 'saved' ? (
              <Check className="size-3.5" />
            ) : (
              <Save className="size-3.5" />
            )}
            {saved === 'saved' ? 'Saved' : 'Save form'}
          </button>
        </div>
      </header>

      {generationError ? (
        <div className="shrink-0 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 sm:px-6">
          {generationError}
        </div>
      ) : null}

      {/* Mobile tab switcher */}
      <div className="flex shrink-0 rounded-lg bg-neutral-100 p-0.5 sm:hidden">
        <TabButton
          active={phase === 'editing'}
          onClick={() => setPhase('editing')}
          icon={PencilLine}
          className="flex-1"
        >
          Edit
        </TabButton>
        <TabButton
          active={phase === 'preview'}
          onClick={() => setPhase('preview')}
          icon={Eye}
          className="flex-1"
        >
          Preview
        </TabButton>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {phase === 'preview' ? (
          <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
            <LivePreview builder={builder} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem]">
            <div className="min-w-0 px-4 py-5 sm:px-6">
              <div className="mx-auto max-w-2xl">
                <div className="mb-4 rounded-xl border border-neutral-200 bg-white p-3">
                  <input
                    value={builder.title}
                    onChange={(event) => builder.setTitle(event.target.value)}
                    placeholder="Form title"
                    className="w-full border-0 bg-transparent p-0 text-base font-bold text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                  <textarea
                    value={builder.description}
                    onChange={(event) =>
                      builder.setDescription(event.target.value)
                    }
                    rows={2}
                    placeholder="Form description (optional)"
                    className="mt-1 w-full resize-none border-0 bg-transparent p-0 text-xs text-neutral-500 outline-none placeholder:text-neutral-400"
                  />
                </div>

                <BuilderCanvas builder={builder} />

                <div className="mt-6 lg:hidden">
                  <BuilderSidebar builder={builder} />
                </div>
              </div>
            </div>

            <aside className="hidden border-l border-neutral-200 bg-white px-4 py-5 lg:block">
              <BuilderSidebar builder={builder} />
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
  className,
}: {
  active: boolean
  onClick: () => void
  icon: typeof PencilLine
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'bg-white text-neutral-900 shadow-sm'
          : 'text-neutral-500 hover:text-neutral-800',
        className,
      )}
    >
      <Icon className="size-3.5" />
      {children}
    </button>
  )
}

function GeneratingScreen({ prompt }: { prompt: string }) {
  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col items-center justify-center px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50">
        <Sparkles className="size-6 animate-pulse text-indigo-500" />
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-neutral-900">
        <Loader2 className="size-4 animate-spin text-indigo-500" />
        Generating your form...
      </p>

      <p className="mt-2 max-w-md text-xs text-neutral-500">“{prompt}”</p>

      <div className="mt-6 w-full max-w-sm space-y-2.5">
        <Shimmer width="90%" delay="0ms" />
        <Shimmer width="70%" delay="150ms" />
        <Shimmer width="80%" delay="300ms" />
      </div>
    </div>
  )
}

function Shimmer({ width, delay }: { width: string; delay: string }) {
  return (
    <div
      className="h-9 animate-pulse rounded-xl bg-neutral-100"
      style={{ width, animationDelay: delay }}
    />
  )
}
