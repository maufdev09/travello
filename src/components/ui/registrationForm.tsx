"use client";

import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { useActionState } from "react";
import { registerTourist } from "@/services/auth/register-tourist";
import { log } from "node:console";

function RegistrationForm() {
  const [state, formAction, isPending] = useActionState( registerTourist, null);
console.log(state);
  return (
    <div>
      <form action={formAction}>
        <FieldGroup>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Create Account"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default RegistrationForm;
