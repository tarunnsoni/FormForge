import { z } from 'zod'

const fieldSchema = z.object({
  id: z.string(),
  type: z.enum([
    'text',
    'textarea',
    'email',
    'number',
    'phone',
    'date',
    'select',
    'checkbox',
    'rating',
  ]),
  label: z.string().min(1),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  minRating: z.number().optional(),
  maxRating: z.number().optional(),
})

const generatedFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  fields: z.array(fieldSchema).min(1).max(20),
})

export type GeneratedForm = z.output<typeof generatedFormSchema>

const SYSTEM_PROMPT = `You are an expert form builder AI. Given a natural-language description, produce a well-structured form definition as STRICT JSON matching this TypeScript type:

{
  "title": string,            // short, human-readable form title
  "description": string,      // 1-2 sentence helper text shown at the top of the form
  "fields": Array<{
    "id": string,             // unique slug-like id, e.g. "full-name"
    "type": "text" | "textarea" | "email" | "number" | "phone" | "date" | "select" | "checkbox" | "rating",
    "label": string,          // the question text
    "placeholder"?: string,   // input placeholder where useful
    "helpText"?: string,      // small hint under the input where useful
    "required": boolean,
    "options"?: string[],     // ONLY for type "select" (2+ meaningful choices)
    "minRating"?: number,     // ONLY for type "rating" (usually 1 or 0)
    "maxRating"?: number      // ONLY for type "rating" (e.g. 5 or 10)
  }>
}

Rules:
- Return ONLY valid JSON. No markdown, no code fences, no commentary.
- Between 3 and 15 fields. Use the most appropriate field types.
- Only use "select" with concrete enumerable options; prefer free-input types otherwise.
- Mark only genuinely essential fields as required.
- Tailor labels, placeholders and help text to the described context and audience.`

/**
 * Tolerant JSON extraction: models sometimes wrap output in code fences or
 * add stray prose. Pull out the first {...} block before parsing.
 */
function extractJson(text: string): string {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text)
  const candidate = (fenced ? fenced[1] : text).trim()

  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('AI response did not contain a JSON object.')
  }

  return candidate.slice(start, end + 1)
}

async function generateWithOpenAI(prompt: string): Promise<GeneratedForm> {
  const apiKey = process.env.OPENAI_API_KEY
  const baseURL = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1'
  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Create a form for the following request:\n\n"""${prompt}"""\n\nRespond with the JSON form definition only.`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`AI provider error (${response.status}): ${detail.slice(0, 300)}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('AI provider returned an empty response.')

  return generatedFormSchema.parse(JSON.parse(extractJson(content)))
}

export { generatedFormSchema, generateWithOpenAI }
