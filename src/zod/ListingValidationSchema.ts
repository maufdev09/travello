import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                               ENUMS                                         */
/* -------------------------------------------------------------------------- */
export const CategoryEnum = z.enum([
  "CUSTOM",
  "HISTORICAL",
  "ADVENTURE",
  "CULTURAL",
  "NATURE",
  "FOOD",
]);

/* -------------------------------------------------------------------------- */
/*                        AVAILABILITY SCHEMA                                  */
/* -------------------------------------------------------------------------- */
export const availabilityUpdateZodSchema = z
  .object({
    startAt: z.iso.datetime().optional(),
    endAt:z.iso.datetime().optional(),
    note: z.string().optional(),
    booked: z.boolean().optional(),
  }).refine(
    (data) => {
      if (data.startAt && data.endAt) {
        return new Date(data.endAt) > new Date(data.startAt);
      }
      return true;
    },
    {
      message: "End time must be after start time",
      path: ["endAt"],
    }
  );


/* -------------------------------------------------------------------------- */
/*                          CREATE LISTING                                     */
/* -------------------------------------------------------------------------- */
export const createListingZodSchema = z.object({
  data:z.object({


  title: z
    .string()
    .min(5, "Title must be at least 5 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  itinerary: z.string().optional(),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  currency: z.string().optional(),

  durationHours: z
    .number()
    .int()
    .positive("Duration must be a positive number"),

  meetingPoint: z
    .string()
    .min(3, "Meeting point is required"),

  maxGroupSize: z
    .number()
    .int()
    .positive("Max group size must be positive"),

  city: z
    .string()
    .min(2, "City is required"),

  category: CategoryEnum.optional(),

  availabilities: z
    .array(availabilityUpdateZodSchema)
    .min(1, "At least one availability is required"),
})
  })
;

/* -------------------------------------------------------------------------- */
/*                          UPDATE LISTING                                     */
/* -------------------------------------------------------------------------- */
export const updateListingZodSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(20).optional(),
  itinerary: z.string().optional(),

  price: z.number().positive().optional(),

  durationHours: z.number().int().positive().optional(),

  meetingPoint: z.string().min(3).optional(),

  maxGroupSize: z.number().int().positive().optional(),

  city: z.string().min(2).optional(),

  category: CategoryEnum.optional(),

  isActive: z.boolean().optional(),
});
