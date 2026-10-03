
import {
  Copy,
  GripVertical,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import type { FormField } from "@/lib/form-builder/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  field: FormField;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
};

export function FormFieldCard({
  field,
  index,
  selected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
}: Props) {
  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-xl border bg-background transition-all ${
        selected
          ? "border-primary ring-1 ring-primary/20 shadow-sm"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GripVertical className="size-4 cursor-grab" />
          <span>Question {index + 1}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="mr-2 size-4" />
              Duplicate
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <Input
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          onClick={(e) => e.stopPropagation()}
          className="h-auto border-0 px-0 text-base font-medium shadow-none focus-visible:ring-0"
          placeholder="Question title"
        />

        <FieldPreview field={field} />

        {selected && (
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <Switch
                id={`required-${field.id}`}
                checked={field.required}
                onCheckedChange={(checked) =>
                  onUpdate({ required: checked })
                }
              />
              <Label
                htmlFor={`required-${field.id}`}
                className="text-sm"
              >
                Required
              </Label>
            </div>

            <span className="text-xs text-muted-foreground">
              {field.type.replace("_", " ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldPreview({ field }: { field: FormField }) {
  switch (field.type) {
    case "short_text":
    case "email":
    case "number":
      return (
        <Input
          disabled
          type={
            field.type === "email"
              ? "email"
              : field.type === "number"
                ? "number"
                : "text"
          }
          placeholder="Short answer"
          className="max-w-md"
        />
      );

    case "long_text":
      return (
        <Textarea
          disabled
          placeholder="Long answer"
          className="min-h-20 resize-none"
        />
      );

    case "multiple_choice":
    case "checkbox":
      return (
        <div className="space-y-3">
          {(field.config.options ?? ["Option 1", "Option 2"]).map(
            (option, index) => (
              <label key={`${option}-${index}`} className="flex items-center gap-3 text-sm">
                <input
                  type={field.type === "checkbox" ? "checkbox" : "radio"}
                  disabled
                  name={`preview-${field.id}`}
                />
                {option}
              </label>
            ),
          )}
        </div>
      );

    case "dropdown":
      return (
        <select
          disabled
          className="h-10 w-full max-w-md rounded-md border bg-background px-3 text-sm"
        >
          <option>Select an option</option>
          {(field.config.options ?? ["Option 1", "Option 2"]).map(
            (option, index) => (
              <option key={`${option}-${index}`}>{option}</option>
            ),
          )}
        </select>
      );

    case "rating":
      return (
        <div className="flex gap-2">
          {Array.from(
            {
              length: Math.max(
                0,
                Math.min(
                  10,
                  (field.config.max ?? 5) - (field.config.min ?? 1) + 1,
                ),
              ),
            },
            (_, i) => i + (field.config.min ?? 1),
          ).map((value) => (
            <div
              key={value}
              className="flex size-9 items-center justify-center rounded-md border text-sm"
            >
              {value}
            </div>
          ))}
        </div>
      );

    case "date":
      return <Input type="date" disabled className="max-w-md" />;

    default:
      return null;
  }
}
