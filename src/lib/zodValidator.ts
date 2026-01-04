import { z } from "zod";

export const zodValidator = <T>(
  payload: T,
  schema: z.ZodTypeAny
) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1] ?? "root",
        message: issue.message,
      })),
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
