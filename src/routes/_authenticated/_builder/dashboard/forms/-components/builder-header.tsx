import { Link } from '@tanstack/react-router'
import { UserButton } from '@clerk/tanstack-react-start'
import { ArrowLeft, Check, Eye, Globe, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type BuilderHeaderProps = {
  title: string
  onPreview: () => void
  onPublish: () => void
}

export function BuilderHeader({
  title,
  onPreview,
  onPublish,
}: BuilderHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-3 sm:px-6">
      <div className="flex min-w-0 items-center sm:gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <div className="min-w-0">
          <span className="truncate text-xs sm:text-sm">{title || 'Untitled Form'}</span>

          <div className="mt-0.5 hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            <Check className="size-3 text-green-600" />
            <span>All changes saved</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline">
          <Save />
          <span className="hidden sm:inline">Save</span>
        </Button>

        <Button onClick={onPreview} className="gap-1.5">
          <Eye className="size-4" />
          <span className="hidden sm:inline">Preview</span>
        </Button>

        <Button variant="ghost" onClick={onPublish} className="gap-1.5">
          <Globe className="size-4" />
          <span className="hidden sm:inline">Publish</span>
        </Button>

        <Separator orientation="vertical" className="mx-1 h-7" />

        <UserButton />
      </div>
    </header>
  )
}
