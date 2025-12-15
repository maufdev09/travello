"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parse } from "cookie";
import { cookies } from "next/headers";
import z from "zod";

const loginValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function loginUser(
  _currentState: any,
  formData: FormData
): Promise<any> {
  // Login logic here

  try {
     let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
    const loginDtata = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedFields = loginValidationSchema.safeParse(loginDtata);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginDtata),
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    

    const setCookieHeaders= res.headers.getSetCookie();

  console.log("Set-Cookie Headers:", setCookieHeaders);


     if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }
         if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });


      


    
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, message: "Registration failed" };
  }
}
