import { userRole } from "@/lib/authUtils";

export interface UserInfo{
    email:string;
    role:userRole
}