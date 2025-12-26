"use server";

import { UserInfo } from "@/types/userInterface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandler";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
  const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return null;
    }

    const verifiedToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!verifiedToken ) {
      return null;
    }

    const userInfo:UserInfo={
      email:verifiedToken.email,
      role:verifiedToken.role,
    } 

    return userInfo
  } catch (error) {
    // token expired / invalid / malformed
    return null;
  }
};
