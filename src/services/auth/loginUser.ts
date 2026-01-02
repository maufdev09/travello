"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/authUtils";
import { setCookie } from "./tokenHandler";
import { serverFetch } from "@/lib/serverfetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationSchema } from "@/zod/authValidation";



export async function loginUser(
  _currentState: any,
  formData: FormData
): Promise<any> {
  // Login logic here

  try {
    const redirectTo = formData.get("redirect") as string | null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (zodValidator(payload, loginValidationSchema).success === false) {
      return zodValidator(payload, loginValidationSchema);
    }
    const validatedFields = zodValidator(payload, loginValidationSchema).data;

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedFields),
      headers: {
        "Content-Type": "application/json",
      }, 
    });

    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    console.log("Set-Cookie Headers:", setCookieHeaders);

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }
    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: any = verifiedToken.role;

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login failed incorrect email or password"
      }`,
    };
  }
}
