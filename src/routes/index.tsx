import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from "./-components/landing/navbar"

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className='min-h-screen'>
      <Navbar />

      <main></main>
    </div>
  )
}
