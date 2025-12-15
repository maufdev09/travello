import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/ui/loginForm";
import React from "react";

function LoginPage() {
  return (
    <div className=" flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Fill in the details below to Create Account .
            </CardDescription>
          </CardHeader>
          <CardContent>

            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
