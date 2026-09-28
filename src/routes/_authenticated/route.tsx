import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getAuthState = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    throw redirect({
      to: "/"
    })
  }

  return { userId }
})

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    return await getAuthState()
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
