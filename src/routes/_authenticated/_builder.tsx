import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_builder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
