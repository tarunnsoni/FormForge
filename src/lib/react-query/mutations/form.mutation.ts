import type {
  CreateFormSchema,
  DeleteFormSchema,
  PublishFormSchema,
  UpdateFormSchema,
} from '#/lib/validations/form.validation'
import { createForm, deleteForm, publishForm, updateForm } from '#/server/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../query-keys'

const useCreateForm = () => {
  return useMutation({
    mutationFn: (data: CreateFormSchema) => createForm({ data }),
  })
}

const useUpdateForm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateFormSchema) => updateForm({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FORM] })
    },
  })
}

const useDeleteForm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DeleteFormSchema) => deleteForm({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FORM] })
    },
  })
}

const usePublishForm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PublishFormSchema) => publishForm({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FORM] })
    },
  })
}

export { useCreateForm, useUpdateForm, useDeleteForm, usePublishForm }
