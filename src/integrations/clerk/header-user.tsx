import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export default function HeaderUser() {
  return (
    <>
      <Show when="signed-out">
        <Button asChild variant="ghost" >
          <SignInButton mode="modal">Sign In</SignInButton>
        </Button>

        <Button
          asChild
          className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
        >
          <SignUpButton mode="modal">Sign Up</SignUpButton>
        </Button>
      </Show>

      <Show when="signed-in">
        <Button
          asChild
          className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
        >
          <Link to="/dashboard/forms/new">Create a Form</Link>
        </Button>

        <UserButton />
      </Show>
    </>
  );
}
