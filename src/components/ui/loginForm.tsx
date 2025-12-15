"use client";

import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { useActionState } from "react";
import { loginUser } from "@/services/auth/loginUser";

function  LoginForm() {
  const [state, formAction, isPending] = useActionState( loginUser, null);
console.log(state);
  return (
    <div>
      <form action={formAction}>
        <FieldGroup>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4"></div>


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
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default LoginForm;
