import {
  Check,
  Clipboard,
  MessageSquare,
  Rocket,
  SlidersHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    label: "DESCRIBE",
    title: "Describe what you need",
    description:
      "Tell FormForge what you're building in plain language. AI turns your idea into a structured form.",
    icon: MessageSquare,
    iconClassName: "bg-indigo-50 text-indigo-600",
    preview: (
      <div className="rounded-md bg-neutral-50 px-3 py-2">
        <p className="truncate text-[9px] text-neutral-400">
          Create a customer feedback form for my SaaS...
        </p>
      </div>
    ),
  },
  {
    number: "02",
    label: "REFINE",
    title: "Review & customize",
    description:
      "Fine-tune questions, validation, and field types with the visual builder before publishing.",
    icon: SlidersHorizontal,
    iconClassName: "bg-violet-50 text-violet-600",
    preview: (
      <div className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <Check className="size-3 text-indigo-600" />

          <span className="text-[9px] text-neutral-500">
            Form ready to publish
          </span>
        </div>

        <span className="text-[9px] font-medium text-indigo-600">
          Preview
        </span>
      </div>
    ),
  },
  {
    number: "03",
    label: "PUBLISH",
    title: "Share & collect responses",
    description:
      "Publish your form with one click, share the link, and start collecting responses immediately.",
    icon: Rocket,
    iconClassName: "bg-emerald-50 text-emerald-600",
    preview: (
      <div className="flex items-center justify-between rounded-md bg-neutral-50 px-3 py-2">
        <span className="truncate text-[9px] text-neutral-400">
          formforge.app/f/customer-feedback
        </span>

        <Clipboard className="ml-2 size-3 shrink-0 text-neutral-400" />
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-0 bg-indigo-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-indigo-600"
          >
            Simple workflow
          </Badge>

          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-3xl lg:text-4xl">
            From idea to published form in three steps
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
            Describe what you need, refine the result, and share your form.
            FormForge handles the rest.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-9">
          {steps.map((step) => (
            <HowItWorksCard
              key={step.number}
              number={step.number}
              label={step.label}
              title={step.title}
              description={step.description}
              icon={step.icon}
              iconClassName={step.iconClassName}
              preview={step.preview}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



interface HowItWorksCardProps {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  preview: React.ReactNode;
}

export function HowItWorksCard({
  number,
  label,
  title,
  description,
  icon: Icon,
  iconClassName = "bg-indigo-50 text-indigo-600",
  preview,
}: HowItWorksCardProps) {
  return (
    <Card className="rounded-xl border-neutral-200 bg-white shadow-none">
      <CardContent className="flex h-full flex-col p-5">
        <Badge
          variant="secondary"
          className="h-5 w-fit rounded-md border-0 bg-indigo-50 px-2 font-mono text-[9px] font-medium text-indigo-600"
        >
          {number} — {label}
        </Badge>

        <div
          className={`mt-5 flex size-9 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="size-4" strokeWidth={2} />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold tracking-tight text-neutral-900">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-neutral-500">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6">{preview}</div>
      </CardContent>
    </Card>
  );
}
