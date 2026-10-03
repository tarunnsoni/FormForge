import {
  Type,
  AlignLeft,
  Mail,
  Hash,
  List,
  CircleCheck,
  CheckSquare,
  Star,
  CalendarDays,
} from "lucide-react";

import type { FieldType } from "./types";

export const fieldTypes: {
  type: FieldType;
  label: string;
  icon: React.ElementType;
}[] = [
  { type: "short_text", label: "Short text", icon: Type },
  { type: "long_text", label: "Long text", icon: AlignLeft },
  { type: "email", label: "Email", icon: Mail },
  { type: "number", label: "Number", icon: Hash },
  { type: "dropdown", label: "Dropdown", icon: List },
  { type: "multiple_choice", label: "Multiple choice", icon: CircleCheck },
  { type: "checkbox", label: "Checkboxes", icon: CheckSquare },
  { type: "rating", label: "Rating", icon: Star },
  { type: "date", label: "Date", icon: CalendarDays },
];
