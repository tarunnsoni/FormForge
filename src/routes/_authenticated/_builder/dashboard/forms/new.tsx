import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_builder/dashboard/forms/new',
)({
  validateSearch: (search: Record<string, unknown>) => ({
    prompt: typeof search.prompt === 'string' ? search.prompt.trim() : ""
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { prompt } = Route.useSearch()

  return <div>Hello "/_authenticated/_builder/dashboard/forms/new"!</div>
}
