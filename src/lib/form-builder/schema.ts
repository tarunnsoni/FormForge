import { z } from 'zod'

export const fieldTypeEnum = z.enum([
  'text',
  'textarea',
  'email',
  'number',
  'phone',
  'date',
  'select',
  'checkbox',
  'rating',
])

export type FieldType = z.infer<typeof fieldTypeEnum>

export const formFieldSchema = z.object({
  id: z.string(),
  type: fieldTypeEnum,
  label: z.string().min(1),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  minRating: z.number().optional(),
  maxRating: z.number().optional(),
})

export type FormField = z.input<typeof formFieldSchema>
export type Field = z.output<typeof formFieldSchema>

export const formDefinitionSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  fields: z.array(formFieldSchema).min(1).max(20),
})

export type FormDefinitionInput = z.input<typeof formDefinitionSchema>
export type FormDefinition = z.output<typeof formDefinitionSchema>

export function createId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function createEmptyField(type: FieldType = 'text'): Field {
  return {
    id: createId(),
    type,
    label: 'Untitled question',
    required: false,
    ...(type === 'select' ? { options: ['Option 1', 'Option 2'] } : {}),
    ...(type === 'rating' ? { minRating: 1, maxRating: 5 } : {}),
  }
}

/**
 * Offline fallback used when no AI provider key is configured on the server.
 * Produces a reasonable starting form from the user's prompt so the builder
 * flow can be developed and demoed end-to-end without network access.
 */
export function sampleFormFromPrompt(prompt: string): FormDefinition {
  const p = prompt.toLowerCase()
  const words = prompt
    .replace(/[^a-zA-Z\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join(' ')

  const title = words
    ? words.charAt(0).toUpperCase() + words.slice(1)
    : 'Untitled Form'

  const fields: Field[] = [
    {
      id: createId(),
      type: 'text',
      label: 'Full name',
      placeholder: 'Jane Doe',
      required: true,
    },
    {
      id: createId(),
      type: 'email',
      label: 'Email address',
      placeholder: 'jane@example.com',
      required: true,
    },
  ]

  if (/rsvp|event|attend/.test(p)) {
    fields.push(
      {
        id: createId(),
        type: 'select',
        label: 'Will you be attending?',
        required: true,
        options: ['Yes', 'No', 'Maybe'],
      },
      {
        id: createId(),
        type: 'number',
        label: 'Number of guests',
        placeholder: '1',
        required: false,
      },
      {
        id: createId(),
        type: 'text',
        label: 'Dietary preferences',
        placeholder: 'Vegetarian, allergies...',
        required: false,
      },
    )
  } else if (/job|application|hiring|candidate|resume/.test(p)) {
    fields.push(
      {
        id: createId(),
        type: 'phone',
        label: 'Phone number',
        placeholder: '+1 (555) 000-0000',
        required: false,
      },
      {
        id: createId(),
        type: 'text',
        label: 'Portfolio / LinkedIn URL',
        placeholder: 'https://',
        required: false,
      },
      {
        id: createId(),
        type: 'textarea',
        label: 'Relevant experience',
        placeholder: 'Tell us about your background...',
        required: true,
      },
    )
  } else if (/waitlist|signup|sign-up|early access/.test(p)) {
    fields.push(
      {
        id: createId(),
        type: 'text',
        label: 'Company',
        placeholder: 'Acme Inc.',
        required: false,
      },
      {
        id: createId(),
        type: 'select',
        label: 'Your role',
        required: false,
        options: ['Founder', 'Product', 'Engineering', 'Marketing', 'Other'],
      },
      {
        id: createId(),
        type: 'textarea',
        label: 'What do you want to use the product for?',
        placeholder: 'Describe your use case...',
        required: false,
      },
    )
  } else if (/nps|csat|survey|feedback|review/.test(p)) {
    fields.push(
      {
        id: createId(),
        type: 'rating',
        label: 'How likely are you to recommend us?',
        minRating: 0,
        maxRating: 10,
        required: true,
      },
      {
        id: createId(),
        type: 'select',
        label: 'How satisfied are you overall?',
        required: true,
        options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
      },
      {
        id: createId(),
        type: 'textarea',
        label: 'Additional comments',
        placeholder: 'Anything else you would like to share?',
        required: false,
      },
    )
  } else {
    fields.push(
      {
        id: createId(),
        type: 'textarea',
        label: 'Your response',
        placeholder: 'Type here...',
        required: true,
      },
      {
        id: createId(),
        type: 'checkbox',
        label: 'I agree to be contacted about this request',
        required: false,
      },
    )
  }

  return {
    title,
    description: `Generated from prompt: "${prompt.trim()}"`,
    fields,
  }
}
