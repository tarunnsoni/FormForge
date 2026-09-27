import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  GitBranch,
  LayoutTemplate,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  iconClassName: string;
}

const features: FeatureCardProps[] = [
  {
    title: "AI Form Generation",
    description:
      "Describe what you need in plain language and let AI create a complete form in seconds.",
    link: "Generate a form",
    icon: Sparkles,
    iconClassName: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Visual Form Builder",
    description:
      "Customize questions, fields, validation, and layout with a simple visual editor.",
    link: "Explore the builder",
    icon: LayoutTemplate,
    iconClassName: "bg-violet-100 text-violet-600",
  },
  {
    title: "Smart Logic & Rules",
    description:
      "Create conditional questions and dynamic paths that adapt to every response.",
    link: "Explore smart logic",
    icon: GitBranch,
    iconClassName: "bg-neutral-100 text-neutral-700",
  },
  {
    title: "Response Insights",
    description:
      "Turn collected responses into useful summaries, patterns, and actionable insights.",
    link: "Explore analytics",
    icon: TrendingUp,
    iconClassName: "bg-rose-100 text-rose-600",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-0 bg-indigo-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-indigo-600"
          >
            Built for better forms
          </Badge>

          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-3xl lg:text-4xl">
            Everything you need to build smarter forms
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
            From generating your first question with AI to understanding every
            response, FormForge keeps your entire form workflow in one place.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  link,
  icon: Icon,
  iconClassName,
}: FeatureCardProps) {
  return (
    <Card className="group rounded-xl border-neutral-200 bg-white shadow-none transition-colors hover:border-neutral-300">
      <CardContent className="flex h-full flex-col p-5">
        <div
          className={`flex size-8 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon
            className="size-4"
            strokeWidth={2}
          />
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold tracking-tight text-neutral-900">
            {title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-neutral-500">
            {description}
          </p>
        </div>

        <Button
          variant="link"
          className="mt-auto h-auto justify-start p-0 pt-8 text-[11px] font-medium text-indigo-600 no-underline hover:no-underline"
        >
          {link}
          <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
