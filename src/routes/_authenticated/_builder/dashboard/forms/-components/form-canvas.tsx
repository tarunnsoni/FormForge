
import { Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { FormField } from "@/lib/form-builder/types";
import { FormFieldCard } from "./form-field-card";

type FormCanvasProps = {
  title: string;
  description: string;
  fields: FormField[];
  selectedFieldId: string | null;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSelectField: (id: string | null) => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
  onRemoveField: (id: string) => void;
  onDuplicateField: (id: string) => void;
  onAddField: () => void;
};

export function FormCanvas({
  title,
  description,
  fields,
  selectedFieldId,
  onTitleChange,
  onDescriptionChange,
  onSelectField,
  onUpdateField,
  onRemoveField,
  onDuplicateField,
  onAddField,
}: FormCanvasProps) {
  return (
    <div className="min-h-full bg-muted/30 px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-2xl space-y-4">
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="h-2 rounded-t-xl bg-primary" />

          <div className="space-y-3 p-5 sm:p-7">
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Untitled Form"
              className="h-auto border-0 px-0 text-2xl font-semibold shadow-none focus-visible:ring-0 sm:text-3xl"
            />

            <Textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Add a description for your form..."
              className="min-h-12 resize-none border-0 px-0 text-sm text-muted-foreground shadow-none focus-visible:ring-0"
            />

            <div className="flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
              <Sparkles className="size-3.5" />
              <span>Your form, your rules. Customize it however you like.</span>
            </div>
          </div>
        </div>

        {fields.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-background px-5 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Plus className="size-5 text-primary" />
            </div>

            <h3 className="font-medium">Start building your form</h3>

            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Add your first question using the field panel, or let AI help
              you create one.
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={onAddField}
            >
              <Plus className="mr-2 size-4" />
              Add your first question
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <FormFieldCard
                key={field.id}
                field={field}
                index={index}
                selected={selectedFieldId === field.id}
                onSelect={() => onSelectField(field.id)}
                onUpdate={(updates) => onUpdateField(field.id, updates)}
                onDelete={() => onRemoveField(field.id)}
                onDuplicate={() => onDuplicateField(field.id)}
              />
            ))}
          </div>
        )}

        {fields.length > 0 && (
          <Button
            variant="outline"
            onClick={onAddField}
            className="h-12 w-full border-dashed bg-background text-muted-foreground hover:text-foreground"
          >
            <Plus className="mr-2 size-4" />
            Add another question
          </Button>
        )}

        <p className="pb-8 text-center text-xs text-muted-foreground">
          FormForge · Form builder
        </p>
      </div>
    </div>
  );
}
