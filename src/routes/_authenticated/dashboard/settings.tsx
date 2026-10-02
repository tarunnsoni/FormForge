import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-lg font-semibold text-neutral-900">Settings</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Workspace settings are coming soon.
      </p>
      <Outlet />
    </div>
  )
}
