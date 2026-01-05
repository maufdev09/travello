"use server";

import { serverFetch } from "@/lib/serverfetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createUserZodSchema,
  updateTouristZodSchema,
} from "@/zod/UserValidationShema";

/* -------------------------------------------------------------------------- */
/*                             CREATE TOURIST                                 */
/* -------------------------------------------------------------------------- */
export async function createTouristByAdmin(
  _prevState: any,
  formData: FormData
): Promise<any> {
  try {
    // 1️⃣ Build payload
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      contactNumber: formData.get("contactNumber"),
      address: formData.get("address"),
    };

    // 2️⃣ Validate
    const validation = zodValidator(payload, createUserZodSchema);
    if (!validation.success) return validation;

    const validated = validation.data as any;

    // 3️⃣ Backend expected structure
    const registerData = {
      password: validated.password,
      data: {
        name: validated.name,
        email: validated.email,
        contactNumber: validated.contactNumber,
        address: validated.address,
      },
    };

    // 4️⃣ Multipart form-data
    const body = new FormData();
    body.append("data", JSON.stringify(registerData));

    const file = formData.get("file");
    if (file) body.append("file", file as Blob);

    // 5️⃣ API call
    const res = await serverFetch.post("/user/create-tourist", {
      body,
      next: { tags: ["admin-tourists"] },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Create tourist failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create tourist",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                             GET ALL TOURISTS                                */
/* -------------------------------------------------------------------------- */
export async function getAllTourists(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/user/tourists${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["admin-tourists"] },
      }
    );

    return await res.json();
  } catch (error: any) {
    console.error("Fetch tourists failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch tourists",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                            GET TOURIST BY ID                               */
/* -------------------------------------------------------------------------- */
export async function getTouristById(id: string) {
  try {
    const res = await serverFetch.get(`/user/tourists/${id}`);
    return await res.json();
  } catch (error: any) {
    console.error("Fetch tourist failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch tourist",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                              UPDATE TOURIST                                */
/* -------------------------------------------------------------------------- */
export async function updateTouristByAdmin(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    // 1️⃣ Build payload
    const payload = {
      data: {
        name: formData.get("name"),
        contactNumber: formData.get("contactNumber"),
        address: formData.get("address"),
        isDeleted: formData.get("isDeleted")
          ? formData.get("isDeleted") === "true"
          : undefined,
      },
    };

    // 2️⃣ Validate
    const validation = zodValidator(payload, updateTouristZodSchema);
    if (!validation.success) return validation;

    // 3️⃣ Multipart
    const body = new FormData();
    body.append("data", JSON.stringify(validation.data));

    const file = formData.get("file");
    if (file) body.append("file", file as Blob);

    // 4️⃣ API call
    const res = await serverFetch.patch(`/user/tourists/${id}`, {
      body,
      next: { tags: ["admin-tourists"] },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Update tourist failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update tourist",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                              DELETE TOURIST                                */
/* -------------------------------------------------------------------------- */
export async function deleteTouristByAdmin(id: string) {
  try {
    const res = await serverFetch.delete(`/user/tourists/${id}`, {
      next: { tags: ["admin-tourists"] },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Delete tourist failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete tourist",
    };
  }
}
