/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";

const registrationValidationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function registerTourist(
  _currentState: any,
  formData: FormData
): Promise<any> {
  // Registration logic here

  try {
    const validationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields =
      registrationValidationSchema.safeParse(validationData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const registerDtata = {
      password: formData.get("password") as string,
      data: {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerDtata));

    const res = await fetch(
      "http://localhost:5000/api/v1/user/create-tourist",
      {
        method: "POST",
        body: newFormData,
      }
    );
    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error:any) {
     if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Registration failed:", error);
    return { success: false, message: "Registration failed" };
  }
}
