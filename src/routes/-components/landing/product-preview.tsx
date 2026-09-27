import {
  ChevronDown,
  GripVertical,
  Plus,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductPreview() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:pb-28">
      <Card className="overflow-hidden rounded-2xl border-neutral-200 bg-white shadow-sm">
        <div className="flex h-12 items-center justify-between border-b border-neutral-200 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="hidden text-sm font-semibold text-neutral-900 sm:block">
              FormForge
            </span>

            <span className="hidden text-neutral-300 sm:block">/</span>

            <span className="truncate text-[11px] font-medium text-neutral-700 sm:text-xs">
              Customer Feedback
            </span>

            <Badge
              variant="secondary"
              className="hidden h-5 gap-1 px-1.5 text-[9px] font-normal sm:inline-flex"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Saved
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="hidden h-7 text-[10px] sm:inline-flex"
            >
              Preview
            </Button>

            <Button
              size="sm"
              className="h-7 rounded-md bg-indigo-600 px-3 text-[10px] hover:bg-indigo-700 sm:text-xs"
            >
              Publish
            </Button>
          </div>
        </div>

        <div className="bg-neutral-50/60 p-3 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 sm:p-4">
              <div className="flex items-start gap-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
                  <Sparkles className="size-3.5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-indigo-950 sm:text-xs">
                    AI generated this form
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-indigo-900/60 sm:text-xs">
                    "Create a customer feedback form for my SaaS product."
                  </p>
                </div>
              </div>
            </div>

            <Card className="mb-3 rounded-xl border-neutral-200 p-4 shadow-none sm:p-5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-[9px] font-normal"
                >
                  Step 1 of 1
                </Badge>

                <span className="text-[9px] text-neutral-400">
                  Public Form
                </span>
              </div>

              <h2 className="mt-3 text-base font-semibold tracking-tight text-neutral-950 sm:text-lg">
                Customer Feedback
              </h2>

              <p className="mt-1 text-[10px] leading-4 text-neutral-500 sm:text-xs">
                Help us understand your experience and improve our product.
              </p>
            </Card>

            <div className="space-y-2.5">
              <QuestionCard
                number="01"
                title="How satisfied are you?"
                required
              >
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div
                      key={value}
                      className={`flex size-7 items-center justify-center rounded-md border text-[9px] sm:size-8 sm:text-[10px] ${
                        value === 4
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-neutral-200 bg-white text-neutral-500"
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </QuestionCard>

              <QuestionCard
                number="02"
                title="What did you like most?"
              >
                <div className="flex h-8 items-center justify-between rounded-md bg-neutral-100 px-3 text-[10px] text-neutral-400 sm:text-xs">
                  <span>Select an option</span>
                  <ChevronDown className="size-3.5" />
                </div>
              </QuestionCard>

              <QuestionCard
                number="03"
                title="What could we improve?"
              >
                <div className="flex h-8 items-center rounded-md bg-neutral-100 px-3 text-[10px] text-neutral-400 sm:text-xs">
                  Share your thoughts...
                </div>
              </QuestionCard>
            </div>

            <Button
              variant="outline"
              className="mt-2.5 h-9 w-full border-dashed bg-white text-[10px] font-normal text-neutral-500 sm:text-xs"
            >
              <Plus className="size-3.5" />
              Add question
            </Button>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="flex items-center gap-1.5 text-[9px] text-neutral-400 transition-colors hover:text-neutral-700 sm:text-[10px]"
              >
                <Sparkles className="size-3 text-indigo-500" />
                AI suggested 2 improvements
              </button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function QuestionCard({
  number,
  title,
  required = false,
  children,
}: {
  number: string;
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-xl border-neutral-200 p-3.5 shadow-none sm:p-4">
      <div className="flex gap-2.5">
        <GripVertical className="mt-0.5 hidden size-3.5 shrink-0 text-neutral-300 sm:block" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-neutral-400">
              {number}
            </span>

            <p className="truncate text-[10px] font-medium text-neutral-900 sm:text-xs">
              {title}

              {required && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </p>
          </div>

          <div className="mt-2.5">{children}</div>
        </div>
      </div>
    </Card>
  );
}
