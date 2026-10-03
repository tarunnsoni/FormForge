import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Show, SignUpButton } from '@clerk/tanstack-react-start'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'

const suggestions = [
  {
    prompt: 'Customer feedback',
    actualPrompt:
      'Create a customer feedback survey with NPS, CSAT scale, and open comments',
  },
  {
    prompt: 'Frontend job application',
    actualPrompt:
      'Create a frontend developer job application form with personal details, experience, portfolio, and technical skills',
  },
  {
    prompt: 'Event RSVP',
    actualPrompt:
      'Create an event RSVP form with attendee details, attendance confirmation, dietary preferences, and guest count',
  },
]

export function CTA() {
  const [prompt, setPrompt] = useState('')

  return (
    <section id='cta' className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Card className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-0 bg-neutral-800 shadow-lg">
          <CardContent className="px-4 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="secondary"
                className="border-0 bg-neutral-800 px-3 py-1 text-[9px] font-medium text-neutral-300"
              >
                <Sparkles className="mr-1.5 size-3 text-indigo-400" />
                Build faster with AI
              </Badge>

              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Ready to build smarter forms?
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-xs leading-5 text-neutral-400 sm:text-sm sm:leading-6">
                Describe what you want to collect and let FormForge turn your
                idea into a ready-to-edit form.
              </p>

              <div className="mx-auto mt-7 max-w-xl rounded-xl bg-white p-2">
                <div className="flex items-center gap-2 px-2">
                  <Sparkles className="size-4 shrink-0 text-indigo-500" />

                  <Input
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    placeholder="Describe the form you want..."
                    className="h-9 border-0 bg-transparent px-0 text-xs text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:ring-0 sm:text-sm"
                  />
                </div>

                <div className="mt-2">
                  <Show when="signed-out">
                    <SignUpButton mode="modal">
                      <Button
                        type="button"
                        className="h-10 w-full rounded-lg bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-700 sm:h-9"
                      >
                        Generate with AI
                        <ArrowRight className="ml-1.5 size-3.5" />
                      </Button>
                    </SignUpButton>
                  </Show>

                  <Show when="signed-in">
                    <Link
                      to="/dashboard/forms/new"
                      disabled={!prompt.trim()}
                      search={{ prompt: prompt }}
                    >
                      <Button
                        type="button"
                        className="h-10 w-full rounded-lg bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-700 sm:h-9"
                      >
                        Generate with AI
                        <ArrowRight className="ml-1.5 size-3.5" />
                      </Button>
                    </Link>
                  </Show>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-[9px] text-neutral-500">Try asking</p>

                <div className="flex flex-wrap justify-center gap-1.5">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.prompt}
                      type="button"
                      onClick={() => setPrompt(suggestion.actualPrompt)}
                      className="rounded-full bg-neutral-800 px-2.5 py-1.5 text-[9px] text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-neutral-200"
                    >
                      {suggestion.prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
