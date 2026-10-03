import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { fieldTypes } from '@/lib/form-builder/field-config'
import type { FieldType } from '@/lib/form-builder/types'

type FieldSidebarProps = {
  onAddField: (type: FieldType) => void
}

export function FieldSidebar({ onAddField }: FieldSidebarProps) {
  return (
    <>
      <aside className="hidden h-full w-58 shrink-0 flex-col border-r bg-background md:flex">
        <SidebarContent onAddField={onAddField} />
      </aside>

      <div className="fixed bottom-4 left-4 z-40 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="h-12 rounded-full px-5 shadow-lg">
              <Plus className="mr-2 size-4" />
              Add Field
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-70 p-0">
            <SheetHeader className="border-b p-4 text-left">
              <SheetTitle>Form Elements</SheetTitle>
            </SheetHeader>

            <SidebarContent onAddField={onAddField} mobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function SidebarContent({
  onAddField,
  mobile = false,
}: {
  onAddField: (type: FieldType) => void
  mobile?: boolean
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {!mobile && (
        <div className="border-b p-4">
          <h2 className="text-sm font-semibold">Form Elements</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Click to add a field
          </p>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="space-y-5 p-3">
          <div>
            <p className="mb-2 px-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Basic Fields
            </p>

            <div className="grid grid-cols-1 gap-1">
              {fieldTypes.map((field) => {
                const Icon = field.icon

                return (
                  <Button
                    key={field.type}
                    type="button"
                    variant="ghost"
                    onClick={() => onAddField(field.type)}
                    className="h-11 justify-start gap-3 px-3"
                  >
                    <Icon className="size-4 text-muted-foreground" />

                    <span className="flex-1 text-left text-sm">
                      {field.label}
                    </span>

                    <Plus className="size-3.5 text-muted-foreground" />
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <p className="text-center text-xs text-muted-foreground">
          More field types coming soon
        </p>
      </div>
    </div>
  )
}
