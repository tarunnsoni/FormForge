import { getForm } from '#/server/form'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../query-keys'
import type { GetFormSchema } from '#/lib/validations/form.validation'

const useForm = (data: GetFormSchema) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FORM],
    queryFn: () => getForm({ data }),
  })
}

export { useForm }
