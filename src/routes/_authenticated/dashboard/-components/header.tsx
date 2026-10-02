import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/tanstack-react-start";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex w-full items-center gap-3">
        <SidebarTrigger className="md:hidden">
          <Menu className="size-5" />
        </SidebarTrigger>

        <div className="hidden items-center gap-2 md:flex">
          <span className="text-sm font-medium">Dashboard</span>
        </div>

        <Separator orientation="vertical" className="hidden h-5 md:block" />

        <div className="relative ml-auto w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search forms..."
            className="h-9 border-none bg-muted/50 pl-9 shadow-none focus-visible:ring-1"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 rounded-full"
          asChild
        >
          <div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-8",
                },
              }}
            />
          </div>
        </Button>
      </div>
    </header>
  );
}
