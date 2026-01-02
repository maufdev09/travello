/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/serverfetch";
import { zodValidator } from "@/lib/zodValidator";
import { registrationTouristValidationSchema } from "@/zod/authValidation";



export async function registerTourist(
  _currentState: any,
  formData: FormData
): Promise<any> {
  // Registration logic here

  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (zodValidator(payload, registrationTouristValidationSchema).success === false) {
      return zodValidator(payload, registrationTouristValidationSchema);
    }

    const validatedField: any = zodValidator(
      payload,
      registrationTouristValidationSchema
    ).data;

    const registerDtata = {
      password: validatedField.get("password") as string,
      data: {
        email: validatedField.get("email") as string,
        name: validatedField.get("name") as string,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerDtata));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post(
      "/user/create-tourist",
      {
        body: newFormData,
      }
    );
    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Registration failed:", error);
    return { success: false, message: "Registration failed" };
  }
}
