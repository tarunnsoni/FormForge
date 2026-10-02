import { createServerFn } from '@tanstack/react-start'
import { getCurrentUserId } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import {
  createFormSchema,
  getFormSchema,
  updateFormSchema,
  deleteFormSchema,
  publishFormSchema,
} from '@/lib/validations/form.validation'

const getForm = createServerFn({ method: 'GET' })
  .validator(getFormSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: form, error } = await supabase
      .from('forms')
      .select(
        `
        id,
        user_id,
        title,
        description,
        slug,
        is_published,
        form_fields (
          id,
          form_id,
          type,
          label,
          description,
          required,
          position,
          config
        )
      `,
      )
      .eq('id', data.formId)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return form
  })

const createForm = createServerFn({ method: 'POST' })
  .validator(createFormSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: form, error } = await supabase
      .from('forms')
      .insert({
        user_id: userId,
        title: data.title,
        description: data.description ?? '',
        slug: data.slug,
        is_published: false,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return form
  })

const updateForm = createServerFn({ method: 'POST' })
  .validator(updateFormSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: form, error } = await supabase
      .from('forms')
      .update({
        title: data.title,
        description: data.description ?? '',
        slug: data.slug,
      })
      .eq('id', data.formId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return form
  })

const deleteForm = createServerFn({ method: 'POST' })
  .validator(deleteFormSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', data.formId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
    }
  })

const publishForm = createServerFn({ method: 'POST' })
  .validator(publishFormSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: form, error } = await supabase
      .from('forms')
      .update({
        is_published: true,
      })
      .eq('id', data.formId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return form
  })

export { getForm, createForm, updateForm, deleteForm, publishForm }
