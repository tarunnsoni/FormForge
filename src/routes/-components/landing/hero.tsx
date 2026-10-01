import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Show } from "@clerk/tanstack-react-start";

export function Hero() {
  return (
    <section className="py-10 text-center sm:py-14 lg:py-18">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <Badge
          variant="secondary"
          className="mb-7 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 font-normal text-neutral-700"
        >
          <Sparkles className="mr-1.5 size-3.5 text-indigo-600" />
          AI-powered form builder
        </Badge>

        <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-950 sm:text-5xl md:text-6xl lg:text-[68px]">
          Build forms by simply describing what you need.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
          Turn your requirements into polished, functional forms with AI.
          Customize every question, publish anywhere, and collect responses
          without the busywork.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Show when='signed-in'>
            <Button
              asChild
              size="lg"
              className="h-11 rounded-lg bg-indigo-600 px-6 shadow-sm hover:bg-indigo-700"
            >
              <Link to="/dashboard/forms/new">
                Create a Form
                <ArrowRight />
              </Link>
            </Button>
          </Show>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 rounded-lg border-neutral-200 bg-white px-6 shadow-sm hover:bg-neutral-50"
          >
            <a href="#how-it-works">
              <Play className="fill-current" />
              See how it works
            </a>
          </Button>
        </div>

        <p className="mt-7 text-xs text-neutral-500">
          Create surveys, applications, feedback forms, and more.
        </p>
      </div>
    </section>
  );
}
