import { createFileRoute } from '@tanstack/react-router'
import { BuilderHeader } from './-components'
import { useFormBuilder } from '#/hooks/use-form-builder'
import { FieldSidebar } from './-components/field-sidebar'
import { FormCanvas } from './-components/form-canvas'

export const Route = createFileRoute(
  '/_authenticated/_builder/dashboard/forms/new',
)({
  validateSearch: (search: Record<string, unknown>) => ({
    prompt: typeof search.prompt === 'string' ? search.prompt.trim() : '',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const builder = useFormBuilder()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <BuilderHeader
        title={builder.form.title}
        onPreview={() => console.log('Preview form')}
        onPublish={() => console.log('Publish form')}
      />

      <div className="flex min-h-0 flex-1">
        <FieldSidebar onAddField={builder.addField} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-muted/30">
          <FormCanvas
            title={builder.form.title}
            description={builder.form.description ?? ''}
            fields={builder.form.fields}
            selectedFieldId={builder.selectedFieldId}
            onTitleChange={builder.updateTitle}
            onDescriptionChange={builder.updateDescription}
            onSelectField={builder.selectField}
            onUpdateField={builder.updateField}
            onRemoveField={builder.removeField}
            onDuplicateField={builder.duplicateField}
            onAddField={() => builder.addField('short_text')}
          />
        </main>
      </div>
    </div>
  )
}
