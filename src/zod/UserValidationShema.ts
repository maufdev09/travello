import { z } from "zod";

/* =====================================================
   SHARED HELPERS (Zod v4 style)
===================================================== */

const requiredString = (label: string) =>
  z.string().min(1, { message: `${label} is required` });

const optionalString = (label: string) =>
  z
    .string()
    .min(1, { message: `${label} cannot be empty` })
    .optional();

/* =====================================================
   CREATE USER (Tourist / Admin)
===================================================== */

export const createUserZodSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  data: z.object({
    name: requiredString("Name"),

    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),

    address: optionalString("Address"),
  }),
});

export const createAdminZodSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),

    name: requiredString("Name"),

    email: z.email({ message: "Please provide a valid email address" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),

    address: optionalString("Address"),
  })
  .refine((payload) => payload.password === payload.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["data", "confirmPassword"],
  });

/* =====================================================
   UPDATE TOURIST
===================================================== */

export const updateTouristZodSchema = z.object({
  data: z.object({
    name: optionalString("Name"),
    profilePhoto: optionalString("Profile photo"),
    preferences: optionalString("Preferences"),
    contactNumber: optionalString("Contact number"),
    address: optionalString("Address"),

    isDeleted: z.boolean().optional(),
  }),
});

/* =====================================================
   CREATE GUIDE
===================================================== */

export const createGuideZodSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),

    name: requiredString("Guide name"),

    email: z.email({ message: "Please provide a valid email address" }),

    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),

    profilePhoto: optionalString("Profile photo"),
    bio: optionalString("Bio"),

    languages: z.array(z.string()).optional(),
    expertise: z.array(z.string()).optional(),

    dailyRate: z
      .number()
      .int({ message: "Daily rate must be an integer" })
      .positive({ message: "Daily rate must be greater than 0" })
      .optional(),

    contactNumber: optionalString("Contact number"),
    address: optionalString("Address"),
  })
  .refine((payload) => payload.password === payload.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["data", "confirmPassword"],
  });

/* =====================================================
   UPDATE GUIDE
===================================================== */

export const updateGuideZodSchema = z.object({
  data: z.object({
    name: optionalString("Name"),
    profilePhoto: optionalString("Profile photo"),
    bio: optionalString("Bio"),

    languages: z.array(z.string()).optional(),
    expertise: z.array(z.string()).optional(),

    dailyRate: z
      .number()
      .int({ message: "Daily rate must be an integer" })
      .positive({ message: "Daily rate must be greater than 0" })
      .optional(),

    verificationStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),

    contactNumber: optionalString("Contact number"),
    address: optionalString("Address"),

    isDeleted: z.boolean().optional(),
  }),
});

/* =====================================================
   UPDATE ADMIN
===================================================== */

export const updateAdminZodSchema = z.object({
  data: z.object({
    name: optionalString("Name"),
    profilePhoto: optionalString("Profile photo"),
    contactNumber: optionalString("Contact number"),
    isDeleted: z.boolean().optional(),
  }),
});
