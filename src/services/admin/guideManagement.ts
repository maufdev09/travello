"use server";

import { serverFetch } from "@/lib/serverfetch";
import { zodValidator } from "@/lib/zodValidator";
import { createGuideZodSchema, updateGuideZodSchema } from "@/zod/UserValidationShema";

export async function createGuide(
  _currentState: any,
  formData: FormData
): Promise<any> {
  try {
    // 1️⃣ Raw payload from form
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      bio: formData.get("bio"),
      contactNumber: formData.get("contactNumber"),
      address: formData.get("address"),
      dailyRate: formData.get("dailyRate"),
      languages: formData.getAll("languages"),
      expertise: formData.getAll("expertise"),
    };

    // 2️⃣ Zod validation

    const validationResult = zodValidator(payload, createGuideZodSchema);

    if (validationResult?.success === false) {
      return validationResult;
    }

    const validatedField: any = validationResult.data;

    if (!validatedField) {
      throw new Error("Invalid form data");
    }

    // 3️⃣ API payload structure (backend expected)
    const registerData = {
      password: validatedField.password as string,
      data: {
        email: validatedField.email as string,
        name: validatedField.name as string,
        bio: validatedField.bio,
        contactNumber: validatedField.contactNumber,
        address: validatedField.address,
        dailyRate: validatedField.dailyRate
          ? Number(validatedField.dailyRate)
          : undefined,
        languages: validatedField.languages || [],
        expertise: validatedField.expertise || [],
      },
    };

    // 4️⃣ Multipart form-data
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const file = formData.get("file");
    if (file) {
      newFormData.append("file", file as Blob);
    }

    // 5️⃣ API call
    const res = await serverFetch.post("/user/create-guide", {
      body: newFormData,
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Guide registration failed:", error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function updateGuide(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    // 1️⃣ Build payload from formData
    const payload = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      contactNumber: formData.get("contactNumber"),
      address: formData.get("address"),
      dailyRate: formData.get("dailyRate")
        ? Number(formData.get("dailyRate"))
        : undefined,
      languages: formData.getAll("languages"),
      expertise: formData.getAll("expertise"),
    };

    // 2️⃣ Zod validation
    const validationResult = zodValidator(payload, updateGuideZodSchema);

    if (validationResult?.success === false) {
      return validationResult;
    }

    const validatedPayload = validationResult.data;

    // 3️⃣ Prepare multipart form-data
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    // 4️⃣ API call
    const response = await serverFetch.patch(`/user/guides/${id}`, {
      body: newFormData,
    });

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function getAllGuides(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/user/guides${queryString ? `?${queryString}` : ""}`,
      {
        next: { tags: ["guides"] },
      }
    );

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}


export async function getGuideById(id: string) {
  try {
    const response = await serverFetch.get(`/user/guides/${id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}


export async function deleteGuide(id: string) {
  try {
    const response = await serverFetch.delete(`/user/guides/${id}`);
    const result = await response.json();
    console.log(result);

    // Optional: revalidate guides list cache
    // revalidateTag("guides");

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}









