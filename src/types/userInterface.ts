import { userRole } from "@/lib/authUtils";

export interface UserInfo{
    name:string;
    email:string;
    role:userRole
}

export interface IAvailability {
  id: string;
}

export interface IListing {
  id: string;
}

export interface IBooking {
  id: string;
}

export interface IReview {
  id: string;
}


export enum UserRole {
  ADMIN = "ADMIN",
  GUIDE = "GUIDE",
  TOURIST = "TOURIST",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface IUser {
  id?: string;
  email: string;
  password: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;

  admin?: IAdmin | null;
  guide?: IGuide | null;
  tourist?: ITourist | null;
}

export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  user?: IUser;
}
export interface IGuide {
  id?: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  bio?: string | null;
  languages: string[];
  expertise: string[];
  dailyRate?: number | null;
  verificationStatus: VerificationStatus;
  contactNumber?: string | null;
  address?: string | null;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  availabilities?: IAvailability[];
  listings?: IListing[];
  bookings?: IBooking[];

  user?: IUser;
}
export interface ITourist {
  id?: string;
  email: string;
  name: string;
  profilePhoto?: string | null;
  preferences?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  bookings?: IBooking[];
  reviews?: IReview[];

  user?: IUser;
}

