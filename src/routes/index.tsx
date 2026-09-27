import { createFileRoute } from '@tanstack/react-router'
import { Navbar, Hero, ProductPreview, Features, HowItWorks, CTA, Footer } from "./-components/landing/index"

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className='min-h-screen'>
      <Navbar />

      <main className='mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10'>
        <Hero />
        <ProductPreview />
        <Features />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}
