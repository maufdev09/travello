"use server";

import { serverFetch } from "@/lib/serverfetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAdminZodSchema, createUserZodSchema, updateAdminZodSchema } from "@/zod/UserValidationShema";

/* -------------------------------------------------------------------------- */
/*                               CREATE ADMIN                                 */
/* -------------------------------------------------------------------------- */
export async function createAdminByAdmin(
  _prevState: any,
  formData: FormData
) : Promise<any>{
  try {

    
    // 1️⃣ Build payload
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };



  if (zodValidator(payload, createAdminZodSchema).success === false) {
       return zodValidator(payload, createAdminZodSchema);
     }
 
 
     const validatedField:any = zodValidator(payload, createAdminZodSchema).data

     

 const registerData = {
      password: validatedField.password as string,
      data: {
        email: validatedField.email as string,
        name: validatedField.name as string,
      
      },
    };


    

    // 4️⃣ Multipart form-data
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

   if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
   }

    // 4️⃣ API call
    const res = await serverFetch.post("/user/create-admin", {
      body: newFormData,
      next: { tags: ["admin-admins"] },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Create admin failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create admin",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               GET ALL ADMINS                               */
/* -------------------------------------------------------------------------- */
export async function getAllAdmins(queryString?: string) {
  try {
    const res = await serverFetch.get(
      `/user/admins${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["admin-admins"] },
      }
    );

    return await res.json();
  } catch (error: any) {
    console.error("Fetch admins failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch admins",
    };
  }
}


/* -------------------------------------------------------------------------- */
/*                              GET ADMIN BY ID                               */
/* -------------------------------------------------------------------------- */
export async function getAdminById(id: string) {
  try {
    const res = await serverFetch.get(`/user/admins/${id}`);
    return await res.json();
  } catch (error: any) {
    console.error("Fetch admin failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch admin",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               UPDATE ADMIN                                 */
/* -------------------------------------------------------------------------- */
export async function updateAdminByAdmin(
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
        isDeleted: formData.get("isDeleted")
          ? formData.get("isDeleted") === "true"
          : undefined,
      },
    };

    // 2️⃣ Validate
    const validation = zodValidator(payload, updateAdminZodSchema);
    if (!validation.success) return validation;

    // 3️⃣ Multipart
    const body = new FormData();
    body.append("data", JSON.stringify(validation.data));

    const file = formData.get("file");
    if (file) body.append("file", file as Blob);

    // 4️⃣ API call
    const res = await serverFetch.patch(`/user/admins/${id}`, {
      body,
      next: { tags: ["admin-admins"] },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Update admin failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update admin",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               DELETE ADMIN                                 */
/* -------------------------------------------------------------------------- */
export async function deleteAdminByAdmin(id: string) {
  try {
    const res = await serverFetch.delete(`/user/admins/${id}`, {
      next: { tags: ["admin-admins"] },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Delete admin failed:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete admin",
    };
  }
}

