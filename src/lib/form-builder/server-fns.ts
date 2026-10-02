import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { generateWithOpenAI } from '@/lib/form-builder/generate'
import { sampleFormFromPrompt } from '@/lib/form-builder/schema'

const requestSchema = z.object({
  prompt: z.string().trim().min(3, 'Describe the form you want to create.'),
})

/**
 * Server-side AI generation endpoint.
 *
 * Uses an OpenAI-compatible chat completions API when OPENAI_API_KEY is set.
 * Falls back to a deterministic local heuristic generator so the builder flow
 * works during development without provider keys.
 */
export const generateFormFn = createServerFn({ method: 'POST' })
  .inputValidator(requestSchema)
  .handler(async ({ data }): Promise<{
    form: Awaited<ReturnType<typeof generateWithOpenAI>>
    source: 'ai' | 'fallback'
  }> => {
    if (process.env.OPENAI_API_KEY) {
      const form = await generateWithOpenAI(data.prompt)
      return { form, source: 'ai' }
    }

    // Simulated latency keeps the loading UX honest while developing offline.
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
      form: sampleFormFromPrompt(data.prompt),
      source: 'fallback' as const,
    }
  })
