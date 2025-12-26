"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { useActionState, useEffect } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { getFieldError } from "@/lib/getErrorFields";
import { toast } from "sonner";

function LoginForm({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(loginUser, null);

useEffect(()=>{

  if (state && !state.success && state.message) {
toast.error(state.message)
    
  }
},[state])
  return (
    <div>
      <form action={formAction}>
{
        redirect && (
          <input type="hidden" name="redirect" value={redirect} />
        )
}

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

            {getFieldError("email", state) && (
              <FieldDescription className=" text-red-500 text-sm mt-1">
                {getFieldError("email", state)}
              </FieldDescription>
            )}
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

            {getFieldError("password", state) && (
              <FieldDescription className=" text-red-500 text-sm mt-1">
                {getFieldError("password", state)}
              </FieldDescription>
            )}
          </Field>
          <Button className="cursor-pointer"  type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default LoginForm;
