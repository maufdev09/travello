import { userRole } from "@/lib/authUtils";

export interface UserInfo{
    name:string;
    email:string;
    role:userRole
}