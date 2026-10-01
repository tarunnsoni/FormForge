import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { GreetingSection } from "./-components";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

const promptExamples = [
  {
    prompt: "Customer feedback",
    actualPrompt:
      "Create a customer feedback survey with NPS, CSAT scale, and open comments",
  },
  {
    prompt: "Frontend job application",
    actualPrompt:
      "Create a frontend developer job application form with personal details, experience, portfolio, and technical skills",
  },
  {
    prompt: "Event RSVP",
    actualPrompt:
      "Create an event RSVP form with attendee details, attendance confirmation, dietary preferences, and guest count",
  },
  {
    prompt: "Product waitlist",
    actualPrompt:
      "Create a product waitlist form with name, email, company, role, and what they want to use the product for",
  },
];

function RouteComponent() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    navigate({
      to: "/dashboard/forms/new",
      search: {
        prompt,
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <GreetingSection />

      <Card className="mt-7 overflow-hidden rounded-2xl border-neutral-200 bg-white shadow-none sm:mt-8">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold text-neutral-900">
                  Quick Generate with AI
                </h2>

                <Badge
                  variant="secondary"
                  className="border-0 bg-indigo-50 px-2 py-0.5 text-[9px] font-medium text-indigo-600"
                >
                  AI Form Builder
                </Badge>
              </div>
            </div>

            <p className="hidden text-[11px] text-neutral-400 sm:block">
              Press Enter or click generate
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center">
              <Sparkles className="ml-2 mr-2.5 size-4 shrink-0 text-indigo-500" />

              <Input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleGenerate();
                  }
                }}
                placeholder="Describe the form you want to create..."
                className="h-9 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0 sm:text-sm"
              />
            </div>

            <Button
              type="button"
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="h-9 w-full shrink-0 rounded-lg bg-indigo-600 px-4 text-xs font-medium text-white shadow-none hover:bg-indigo-700 disabled:opacity-50 sm:w-auto"
            >
              <Sparkles className="mr-1.5 size-3.5" />
              Generate Form
            </Button>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-medium text-neutral-500">
              Try a prompt
            </p>

            <div className="flex flex-wrap gap-2">
              {promptExamples.map((example) => (
                <button
                  key={example.prompt}
                  type="button"
                  onClick={() => setPrompt(example.actualPrompt)}
                  className="group flex max-w-full items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-left text-[10px] font-medium text-neutral-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <span className="truncate">
                    {example.prompt}
                  </span>

                  <ArrowRight className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
