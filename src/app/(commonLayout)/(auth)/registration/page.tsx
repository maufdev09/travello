import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegistrationForm from "@/components/ui/registrationForm";
import Link from "next/link";

function RegisterPage() {


  return (
    <div className=" flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className=" text-4xl font-bold  text-secondary ">Create Account</CardTitle>
            <CardDescription>
              Fill in the details below to Create Account .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegistrationForm />
          </CardContent>  

          <CardFooter>
            <p> Already have an account? <Link href="/login" className=" text-blue-500 hover:underline">Login</Link></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
