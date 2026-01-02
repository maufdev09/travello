"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { useActionState, useEffect } from "react";
import { registerTourist } from "@/services/auth/register-tourist";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";

function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerTourist, null);
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

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

            <InputFieldError field="name" state={state} />
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

            <InputFieldError field="email" state={state} />
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

            <InputFieldError field="password" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              type="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
            />

            <InputFieldError field="confirmPassword" state={state} />
          </Field>
          <Button className="cursor-pointer" type="submit" disabled={isPending}>
            {isPending ? "Registering..." : "Create Account"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default RegistrationForm;
