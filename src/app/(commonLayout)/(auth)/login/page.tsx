import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/ui/loginForm";
import Link from "next/link";
import React from "react";

async function  LoginPage({
  searchParams
}:{
  searchParams?:Promise<{ redirect?: string }>;
}) {

  const params = (await searchParams)||{}




  return (
    <div className=" flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Login your Account</CardTitle>
            <CardDescription>
              Fill in the details below to Login .
            </CardDescription>
          </CardHeader>
          <CardContent>

            <LoginForm redirect={params.redirect} />
          </CardContent>
          <CardFooter>
            <p> Don&apos;t have an account please? <Link href="/registration" className=" text-blue-500 hover:underline">Register</Link></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
