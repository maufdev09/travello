/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { UserInfo } from "@/types/userInterface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandler";
import { serverFetch } from "@/lib/serverfetch";

export const getUserInfo = async (): Promise<UserInfo | null> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(
                accessToken,
                process.env.JWT_SECRET?.trim() as string
            ) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.guide?.name || result.data.tourist?.name || result.data.name || "Unknown User",
            ...result.data
        };




        return userInfo;
    } catch (error) {
        // token expired / invalid / malformed
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "TOURIST",
        };
    }
};
