import { useUser } from "@clerk/tanstack-react-start";
import { getGreeting } from "#/lib/utils";

export const GreetingSection = () => {
  const { user, isLoaded } = useUser()
  const greeting = getGreeting()


  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-medium tracking-[0.14em] text-neutral-400 uppercase">
            Workspace
            <span className="mx-1.5 text-neutral-300">•</span>
            Production
            <span className="mx-1.5 text-indigo-400">•</span>
            <span className="text-indigo-600">Synced</span>
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-4xl">
            {greeting},{' '}
            {!isLoaded ? 'User' : !user?.firstName ? 'User' : user.firstName}
          </h1>

          <p className="mt-1.5 text-sm text-neutral-500">
            Create, manage, and analyze your forms in one place.
          </p>
        </div>
      </div>
    </section>
  )
}
